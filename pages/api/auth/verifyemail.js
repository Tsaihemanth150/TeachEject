import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

export default async function handler(req, res) {
    const { token } = req.body; // Extract token from req.body
   
    if (req.method === 'POST') {
        await connect();
        
        try {
            // Find user by verifyToken
            const user = await User.findOne({ verifyToken: token ,verifyTokenExpiry:{$gt:Date.now()}});
         
            if (!user) {
                return res.status(400).json({ error: 'Invalid or expired token' });
            }

          
            user.isVerified = true;
            await user.save();

            res.status(200).json({ message: 'Email verified successfully!' });
        } catch (error) {
            
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
