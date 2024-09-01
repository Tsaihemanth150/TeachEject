import mongoose from 'mongoose';
import User from './userModel';
import InsuranceProduct from './prodcuts'; // Import InsuranceProduct model

const claimSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    claimNumber: {
        type: String,
        unique: true,
        default: function() {
            const randomID = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
            return `TCCL${randomID}`;
        }
    },  
    insuranceProducts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InsuranceProduct'
    },
   claimDate: {
        type: Date,
        default: Date.now
    },claimStatus: {
        type: String,
        default: 'Pending'
    },
    comments: {
        type: String,
        default: 'happy to help you!'
    },
    claimAmount: {
        type: Number,
        default: 0
    },
    approvedBy: {
        type: String,
        default: ''
    },
    approvedDate: {
        type: Date,
    },
    approvedAmount: {
        type: Number,
        default: 0
    },
    reapply: {
        type: Boolean,
        default: false
    },
    updatecount: {
        type: Number,
        default: 0
    }
   
});

const Claim = mongoose.models.claim || mongoose.model('claim', claimSchema);

export default Claim;
