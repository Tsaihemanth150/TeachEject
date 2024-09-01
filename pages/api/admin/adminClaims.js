// pages/api/contacts.js
import {connect} from '@/dbConfig/dbConfig';
import Claim from '@/models/claims'; // Assuming Contact model is defined in models/Contact.js
import User from '@/models/userModel'; // Assuming User model is defined in models/User.js
export default async function handler(req, res) {
    await connect();

  if (req.method === 'GET') {
    try {
        const claim = await Claim.find({}); // Fetch all claims
      
        
      
      res.status(200).json({ success: true, data: claim });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (req.method === 'POST') {
    try {
      const contact = await Claim.create(req.body);
      res.status(201).json({ success: true, data: contact });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
