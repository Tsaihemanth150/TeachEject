import mongoose from 'mongoose';
import User from './userModel'; // Assuming this is the correct path to your user model
import InsuranceProduct from './prodcuts'; // Assuming this is the correct path to your products model

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        required: true,
        
    },
    address: {
        type: String
    },
    gender: {
        type: String
    },
    insuranceProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InsuranceProduct'
    }],
    policies: [{
        Number: {
            type: String,
        },
        policyStartDate: {
            type: Date,
        },
        policyEndDate: {
            type: Date,
        }
    }],
    amount: {
        type: Number,
        required: true
    },status: {
        type: String,
        default: 'paid'
    },paymentMehtod: {
        type: String,
       
    },paymnetDetails: {
        type: Object,
       
    },
});

const Order = mongoose.models.Orders || mongoose.model("Orders", orderSchema);
export default Order;
