import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name"]
    },
    email: {
        type: String,
        required: [true, "Please enter the Email"],
     
    },
    desc: {
        type: String,
        required: false
    },
    isResolved: {
        type: Boolean,
        default: false
    },
    adminComment: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now, // Set to current date and time by default
        get: (v) => {
            if (v instanceof Date) {
                // Convert to IST (Indian Standard Time)
                return new Date(v.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
            }
            return v;
        }
    }
});

const contact = mongoose.models.Contacts || mongoose.model("Contacts", contactSchema);
export default contact;
