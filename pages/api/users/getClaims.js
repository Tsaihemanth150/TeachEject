import { connect } from '@/dbConfig/dbConfig';
import InsuranceProduct from '@/models/prodcuts'; // Import InsuranceProduct model
import Claim from '@/models/claims'; // Import Claim model
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to the database
      await connect(); 

      const { user } = req.body; // Assuming user and claimStatus are in the request body
       
      // Perform filtering logic here (this is a placeholder)
      // You would replace this with actual database queries or data manipulation logic
      
      const userClaims = await Claim.find({ user });
     
      // Send the filtered users back as the API response
      res.status(200).json(userClaims);
    } catch (error) {
      console.error('Error filtering users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
