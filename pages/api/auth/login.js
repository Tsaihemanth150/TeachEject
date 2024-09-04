"use server";

import bcrypt from 'bcryptjs';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
export default async function handler(req, res) {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Handle main POST request
    if (req.method === 'POST') {
        await connect();
        try {
            const { username, password } = req.body; //get username and password
            
            if (!username || !password) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            
            const user = await User.findOne({ username }); // find user by username

            if (!user) {
                return res.status(400).json({ error: 'Incorrect username or password' });
            }

            const match = await bcrypt.compare(password, user.password); // password check 
            if(user.isBlocked){
                return res.status(400).json({ error: 'User is Blocked ! please contact out Team' });
            }
            if (match) {

              const verifiedUser = user.isVerified
                if(verifiedUser){
                    const admin = user.isAdmin;
                    let token;
                    if(admin){
                        token = jwt.sign({ email: user.email, name: user.name, id: user._id, isAdmin: user.isAdmin }, process.env.Token_SECERT, { expiresIn: '1d' });
                    } else {
                        token = jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.Token_SECERT, { expiresIn: '1d' });
                    }

                    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust this to your frontend URL if necessary
                    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
                    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                    res.setHeader('Set-Cookie', `Token=${token}; Path=/; HttpOnly`);
                    res.status(200).json({ success: true, token, message: `Welcome ${user.name}` });
                } else {
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
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
