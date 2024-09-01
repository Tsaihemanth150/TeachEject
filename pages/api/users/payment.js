import { connect } from '@/dbConfig/dbConfig';
import Profile from '@/models/profileModel';
import InsuranceProduct from '@/models/prodcuts'; // Corrected typo in the import statement
import Orders from '@/models/orders';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connect(); // Ensure database connection
    
    try {
      const {  userID, product } = req.body;
   
      let existingProfile = await Profile.findOne({ user: userID });

      if (existingProfile) {
        if (!existingProfile.insuranceProducts) {
          existingProfile.insuranceProducts = [];
        }
        existingProfile.insuranceProducts.push(product._id);

        await existingProfile.save();
        return res.status(200).json({ success: 'Profile updated successfully' });
 
      } else {
        return res.status(404).json({ error: 'Profile not found' });
      }
    } catch (error) {
      console.error('Error in profile API:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
