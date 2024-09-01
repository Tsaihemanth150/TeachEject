import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        unique: true,
        default: function() {
            const randomID = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
            return `TC${randomID}`;
        }
    },
    username: {
        type: String,
        required: [true, "Please enter the Username"],
        unique: true
    },
    name: {
        type: String,
        required: [true, "Please enter the Name"],
    },
    email: {
        type: String,
        required: [true, "Please enter the Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
    },
    
    phoneNumber: {
        type: String,
        required: [true, "Please enter the phone number"],
        unique: true
    },
    dateOfBirth: {
        type: Date,
        
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBlocked:{
    type: Boolean,
    default: false,
    },orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyToken: String,
    verifyTokenExpiry: String

});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);
export default User;
