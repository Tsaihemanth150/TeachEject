// pages/api/users.js


import { connect } from '@/dbConfig/dbConfig';
import  InsuranceProduct from '@/models/prodcuts'; // Assuming you have a User model defined

export default async function handler(req, res) {
  // Connect to your database
  await connect();
  const {insuranceID} = req.body;

  
  try {
    const Insurance = await InsuranceProduct.findById(insuranceID);
    res.status(200).json({ success: true, data: Insurance });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
}
