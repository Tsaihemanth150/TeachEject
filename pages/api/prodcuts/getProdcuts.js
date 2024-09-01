// pages/api/users.js


import { connect } from '@/dbConfig/dbConfig';
import  InsuranceProduct from '@/models/prodcuts'; // Assuming you have a User model defined

export default async function handler(req, res) {
  // Connect to your database
  await connect();

  
  try {
    const InsuranceProducts = await InsuranceProduct.find();
    res.status(200).json({ success: true, data: InsuranceProducts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
}
