// pages/api/addProduct.js
import { connect } from '@/dbConfig/dbConfig';
import InsuranceProduct from '@/models/prodcuts'; // Corrected typo in import statement
import User from '@/models/userModel';

export default async function handler(req, res) {
  await connect();

  if (req.method === 'POST') {
    try {
      const { user} = req.body;
      
      const userdetails = await User.findById({ _id:user} );

      res.status(201).json(userdetails);
    } catch (error) {
      console.error('Failed to fetch User Deatails', error.message);
      res.status(500).json({ message: 'Failed to fetch User Deatails', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
