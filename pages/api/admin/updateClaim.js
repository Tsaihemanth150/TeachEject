import { connect } from '@/dbConfig/dbConfig';
import Claim from '@/models/claims';

export default async function handler(req, res) {
    await connect();
    if (req.method === 'POST') {
        try {
            const { ClaimId, claimStatus, comments, claimAmount, approvedBy, approvedDate, approvedAmount, reapply } = req.body;
         
            // Create an update object with only the provided fields
        
            // Create an update object with only the provided fields
            const updateFields = {};
            if (claimStatus) updateFields.claimStatus = claimStatus;
            if (comments) updateFields.comments = comments;
            if (claimAmount) updateFields.claimAmount = claimAmount;
            if (approvedBy) updateFields.approvedBy = approvedBy;
            if (approvedDate) updateFields.approvedDate = approvedDate;
            if (approvedAmount) updateFields.approvedAmount = approvedAmount;
            if (reapply) updateFields.reapply = reapply === "false" ? false : true;
            updateFields.updatecount = updateFields.updatecount ? updateFields.updatecount + 1 : 1;

            const claim = await Claim.findByIdAndUpdate(ClaimId, updateFields, { new: true });

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
