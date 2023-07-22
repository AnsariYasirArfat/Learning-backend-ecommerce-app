import mongoose from "mongoose";
import Orderstatus from "../utils/orderStatus.js";
const orderSchema = new mongoose.Schema({
    product: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },
                count: Number,
                price: Number
            }
        ],
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    coupon:String,
    transactionId: String,
    status: {
        type: String,
        enum: Object.values(Orderstatus),
        default: Orderstatus.ORDERED,
    }

}, { timestamps: true })
export default mongoose.model("Order", orderSchema)