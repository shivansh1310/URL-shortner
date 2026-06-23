import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [ {
        timestamp: { type: Number }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 25920000, //30 days
    },
    },  
    { timestamps: true }
)

const URL = mongoose.model('url', urlSchema);

export default URL;