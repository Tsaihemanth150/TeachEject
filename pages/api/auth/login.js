"use server";

import bcrypt from 'bcryptjs';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
var jwt = require('jsonwebtoken');


export default async function handler(req, res) {
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

              const verfiedUser = user.isVerified
                if(verfiedUser){
                        const admin = user.isAdmin;
                    if(admin){
                        var token = jwt.sign({ email: user.email, name: user.name,id:user._id,isAdmin:user.isAdmin },process.env.Token_SECERT,{ expiresIn: '1d' } );
                        res.setHeader('Set-Cookie', `Token=${token}; Path=/; HttpOnly`);
                        res.status(200).json({ success: true, token, message: `Welcome ${user.name}` });
                    }else{
                        var token = jwt.sign({ email: user.email,id:user._id, name: user.name },process.env.Token_SECERT,{ expiresIn: '1d' } );
                        res.setHeader('Set-Cookie', `Token=${token}; Path=/; HttpOnly`);  
                        res.status(200).json({ success: true, token, message: `Welcome ${user.name}` });
                    }
                    
                    
                    
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
