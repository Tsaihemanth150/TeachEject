import { connect } from '@/dbConfig/dbConfig';
import Profile from '@/models/profileModel';
import InsuranceProduct from '@/models/prodcuts'; // Import InsuranceProduct model
import User from '@/models/userModel';
import claim from '@/models/claims';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connect(); // Ensure database connection
    
    try {
      const { userId, insuranceProducts } = req.body;
      
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      
      if (!insuranceProducts) {
        return res.status(400).json({ error: 'Insurance Products is required' });
      }
      
      const existingClaim = await claim.findOne({ user: userId, insuranceProducts: insuranceProducts });

      if (existingClaim ) {
        return res.status(400).json({ error: 'Claim already exists' });
      }
      
      // Create a new claim
      await claim.create({ user: userId, insuranceProducts: insuranceProducts });
      
      // Update the number of claims in the user's profile
      const profile = await Profile.findOne({ user: userId });
      if (profile) {
        await Profile.findOneAndUpdate({ user: userId }, { $inc: { numberOfClaims: 1 } });
      }
      
      return res.status(200).json({ success: 'Claim request has been sent successfully' });
    } catch (error) {
      console.error('Error in profile API:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
