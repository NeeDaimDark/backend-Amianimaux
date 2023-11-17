import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import bodyParser from "body-parser";
import userRoutes from './routes/user.js';
import raceRoutes from './routes/race.js';
import animalRoutes from './routes/animal.js';
import multer from 'multer';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();

const hostname = process.env.SERVERURL;
const port = process.env.SERVERPORT;

//info on req : GET /route ms -25
app.use(morgan("tiny"));

app.use(cors());
connectDb();
//bech taati acces lel dossier media li fih les images, localhost:9095/media/fifa.jpg
app.use("/media", express.static("media"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up multer for image uploads
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

const imageUpload = multer({ storage: imageStorage });

app.post("/uploads", imageUpload.single('upload'), (req, res) => {
    res.json({
        success: 1,
        profilPic: `${req.file.filename}`
    });
});

// Set up multer for video uploads
const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/videos');
    },
    filename: (req, file, cb) => {
        cb(null, `IMAGE_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const videoUpload = multer({ storage: videoStorage });

app.post("/uploadVideo", videoUpload.single('video'), (req, res) => {
    res.json({
        success: 1,
        videoUrl: `${req.file.filename}`
    });
});

app.use('/race', raceRoutes);
app.use('/user', userRoutes);
app.use('/animal', animalRoutes);

app.use("/upload/images", express.static("upload/images"));




app.listen(port, hostname, () => {
    console.log(`Server running on ${hostname}:${port}`);
});
