import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await connect();
        try {
            const { userID } = req.body;

            const user = await User.findOne({ userID });
            
            user.isBlocked = false;
            await user.save();

            res.status(200).json({ message: 'User is unblocked successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed but api is working' });
    }
}
