
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await connect();
        try {
            let query;
            if (req.body.username) {
                query = { username: req.body.username };
            } else if (req.body.userID) {
                query = { userID: req.body.userID };
            } 

            const user = await User.findOne(query);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            user.isBlocked = true;
            await user.save();

            res.status(200).json({ message: 'User is blocked successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

