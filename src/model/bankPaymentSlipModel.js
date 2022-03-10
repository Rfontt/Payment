import mongoose from "mongoose";

const bankPaymentSlipSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    bank: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const model = mongoose.model('bankPaymentSlip', bankPaymentSlipSchema);

export default model;