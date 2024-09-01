// pages/api/users.js


import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel'; // Assuming you have a User model defined

export default async function handler(req, res) {
  // Connect to your database
  await connect();

  // Fetch all non-admin users from the database
  try {
    const users = await User.find({ isAdmin: { $ne: true } });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
}
