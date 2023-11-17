import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import 'dotenv/config';
import nodemailer from 'nodemailer';
import * as crypto from "crypto";

const secretKey = process.env.SECRET_KEY;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "mohamedamine.koubaa@esprit.tn",
        pass: "Emna2007890**"
    }
});


export const signup = async (req, res) => {

    console.log('Received signup request');
    console.log('Request body:', req.body);
            const password = req.body.password;
            const encryptedPassword = await bcrypt.hash(password, 10);

            User.create({
                email : req.body.email,
                name: req.body.name,
                number: req.body.number,
                password: encryptedPassword,
                address: req.body.address,

            })
                .then( (newUser) => {
                    res.status(200).json({
                        email: newUser.email,
                        name: newUser.name,
                        number : newUser.number,
                        password: newUser.password,
                        address: newUser.address,
                    });
                })
                .catch((err) => {
                    res.status(500).json({ error: err });
                });
        }


export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Received signup request');
    console.log('Request body:', req.body);
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(430).json({ message: 'Authentication failed. User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(431).json({ message: 'Authentication failed. Wrong password.' });
        }

        return res.json({ userId: user._id });// Send a simple success message upon successful login
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}


export const forgotPassword = async (req,res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: 'User not found.' });
        }
        const token = crypto.randomBytes(3).toString('hex').toUpperCase();

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();
        const mailOptions = {
            to: user.email,
            from: process.env.USERNAME,
            subject: 'Reset your password on Anmianimaux',
            html: `
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Reset your password on MuniSignaler</title>
        <style>
          body {
            background-color: #1a1a1a;
            color: #fff;
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
          }
          .container {
            margin: 0 auto;
            max-width: 600px;
            padding: 20px;
          }
          .header {
            background-color: #0074d9;
            padding: 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
          }
          .content {
            background-color: #f4f4f4;
            border-radius: 5px;
            margin-top: 20px;
            padding: 20px;
            text-align: center;
          }
          .content p {
            margin: 0 0 20px;
          }
          .content .code {
            background-color: #0074d9;
            border-radius: 5px;
            color: #fff;
            display: inline-block;
            font-size: 20px;
            font-weight: bold;
            margin-top: 20px;
            padding: 10px 20px;
            margin-bottom: 10px;

          }
          .footer {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Reset your password on amianimaux</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>You are receiving this email because you (or someone else) has requested the reset of the password for your account.</p>
            <p>Please enter the following code to proceed with the password reset process in the app:</p>
            <div class="code">${token}</div>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
          </div>
          <div class="footer">
            <p>Thank you,</p>
            <p>MuniSignaler Support</p>
          </div>
        </div>
      </body>
    </html>
  `
        };
        await transporter.sendMail(mailOptions);
        return res.json({ message: 'An email has been sent to your email address with instructions to reset your password.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}
export const verifyResetPasswordToken = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({ resetPasswordToken: code });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset password code.' });
        }
        const now = new Date();
        if (user.resetPasswordExpires < now) {
            return res.status(401).json({ message: 'Reset password code has expired.' });
        }
        return res.status(200).json({ message: 'Reset password code is valid.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
export const resetPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        return res.json({ message: 'Password updated successfully.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
export const getProfileDetails = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const userDetails = {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            cin: user.cin,
        };
        return res.json(userDetails);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
export const updateProfile = async (req, res) => {
    const { userId } = req.params;
    const updatedProfile = req.body;
    try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (updatedProfile.fullName) {
            user.fullName = updatedProfile.fullName;
        }
        if (updatedProfile.email) {
            user.email = updatedProfile.email;
        }

        await user.save();

        return res.status(200).json({ message: 'Profile updated successfully.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

