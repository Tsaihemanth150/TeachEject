"use server";
import bcrypt from 'bcryptjs';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
var jwt = require('jsonwebtoken');
import { sendEmail } from '@/helpers/nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await connect();
        try {
            const { email} = req.body; //get email only
            
            if (!email) {
                return res.status(400).json({ error: 'Email is requried  ' });
            }
            
            const user = await User.findOne({ email }); // find user by email

            if (!user) {
                return res.status(400).json({ error: 'User not found with this Email !' });
            }
            
            if(user.isBlocked){
                return res.status(400).json({ error: 'User is Blocked ! please contact out Team' });
            }
            if (user) {

              const verfiedUser = user.isVerified
                if(verfiedUser){
                  await  sendEmail({email,emailType:"RESET",userID:user._id}) // to enabale verfication mail
                  res.status(200).json({ success: 'Email sent to reset password' });
                }else{
                    res.status(400).json({ error: "Please verify your email" }); 
                }

            } else {
                res.status(400).json({ error: "Incorrect details" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed but api is working' });
    }
}
