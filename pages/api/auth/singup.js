// Update the API route (pages/api/signup.js)

import bcrypt from 'bcryptjs';
import validator from 'validator'; // Library for validation
import  { connect }  from '@/dbConfig/dbConfig';
import User from '@/models/userModel'; // Assuming your User model is in models/User.js
import { sendEmail } from '@/helpers/nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connect();
    try {
      const { username, name,email, password, confirmPassword, phoneNumber, dateOfBirth } = req.body;


      // Validate input
      if (!username || ! name || !email || !password || !confirmPassword || !phoneNumber || dateOfBirth) {
        return res.status(400).json({ error: 'All fields are required' });
      }
         
      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
      if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 })) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number' });
      }
      if (!validator.isMobilePhone(phoneNumber, 'any')) {
        return res.status(400).json({ error: 'Invalid phone number format' });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
      if (existingUser && existingUser.isVerified === true) {
        return res.status(400).json({ error: 'User with this email or phone number already exists' });
      }
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = new User({
        username,
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        dateOfBirth,
      });

      const newsaveuser=await user.save(); 


//  await sendEmail({email,emailType:"VERIFY",userID:newsaveuser._id}) // to enabale verfication mail

      return res.status(200).json({ success: 'Account created successfully' });
   
    } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
      
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
