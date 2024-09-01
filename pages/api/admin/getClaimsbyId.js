import { connect } from '@/dbConfig/dbConfig';
import Claim from '@/models/claims';

export default async function handler(req, res) {
    await connect();
    if (req.method === 'POST') {
        try {
            const { ClaimId } = req.body;
         
         
            const claim = await Claim.findById(ClaimId)

            if (!claim) {
                return res.status(404).json({ success: false, message: 'Claim not found' });
            }
            res.status(200).json({ success: true, data: claim });
        } catch (error) {
            console.error('Error updating claim:', error.message);
            res.status(400).json({ success: false, message: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
