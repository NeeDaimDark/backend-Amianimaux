// models/race.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const raceSchema = new Schema(
    {
        raceName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Race = model('Race', raceSchema);

export default Race;
