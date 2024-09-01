import mongoose from 'mongoose';
import User from './userModel';
import InsuranceProduct from './prodcuts'; // Import InsuranceProduct model

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    panCard: {
        type: String,
        unique: true
    },
    policyNumber: {
        type: String,
        
    },
    numberOfPolicies: {
        type: Number,
        default: 0,
    },
    numberOfClaims: {
        type: Number,
        default: 0,
    },
    numberOfDependents: {
        type: Number,
        default: 0,
    },
    address: {
        type: String
    },
    gender: {
        type: String
    },
    bloodGroup: {
        type: String
    },
    emergencyContact: {
        type: String
    },
    emergencyContactNumber: {
        type: String
    },
    emergencyContactRelationship: {
        type: String
    },
    emergencyContactAddress: {
        type: String
    },
    maritalStatus: {
        type: String
    },
    insuranceProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InsuranceProduct'
    }],
    policies: [{
        policyNumber: {
            type: String,
            required: true
        },
        policyStartDate: {
            type: Date,
            required: true
        },
        policyEndDate: {
            type: Date,
            required: true
        }
    }],
    profileupdated:{
        type:Number,
        default:0
    
    }
});

const Profile = mongoose.models.profiles || mongoose.model('profiles', profileSchema);

export default Profile;
