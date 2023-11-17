import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {

        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
         number: {
            type:String,
            required: true
        },
        resetPasswordToken: {
            type: String,
            required: false
        },
        resetPasswordExpires: {
            type: Date,
            required: false
        },
        address: {
            type: String,
            required: true
        },

    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);