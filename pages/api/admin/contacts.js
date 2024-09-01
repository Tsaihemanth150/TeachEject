// pages/api/contacts.js
import {connect} from '@/dbConfig/dbConfig';
import Contact from '@/models/contactModel'; // Assuming Contact model is defined in models/Contact.js

export default async function handler(req, res) {
    await connect();

  if (req.method === 'GET') {
    try {
      const contacts = await Contact.find({});
      res.status(200).json({ success: true, data: contacts });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (req.method === 'POST') {
    try {
      const contact = await Contact.create(req.body);
      res.status(201).json({ success: true, data: contact });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
