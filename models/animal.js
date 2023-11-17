// models/animal.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const animalSchema = new Schema(
    {
        animalName: {
            type: String,
            required: true,
        },
        race: {
            type: Schema.Types.ObjectId,
            ref: 'Race',
            required: true,
        },
        age: {
            type: Number,
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
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Animal = model('Animal', animalSchema);

export default Animal;
