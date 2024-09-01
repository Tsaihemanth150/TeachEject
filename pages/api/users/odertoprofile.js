import { connect } from '@/dbConfig/dbConfig';
import Profile from '@/models/profileModel';
import InsuranceProduct from '@/models/prodcuts'; // Import InsuranceProduct model
import User from '@/models/userModel';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connect(); // Ensure database connection
    
    try {
      const { userId,orderID } = req.body;
      
      
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
     
      if (orderID !== null || orderID !== undefined) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { orders: orderID } }, // Use $push to add the order to the array
            { new: true }
        ); 
    
        const mypofile = await Profile.findOne({ user: userId })
        const polciycount = mypofile.insuranceProducts.length;
        mypofile.numberOfPolicies = polciycount;
       
        await mypofile.save();
        if (updatedUser) {
            await updatedUser.save(); // Corrected typo here
        } 
        return res.status(200).json({ success: 'Order added to profile', user: updatedUser });
    }
    

      
    } catch (error) {
      console.error('Error in profile API:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
