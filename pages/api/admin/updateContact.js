
import {connect} from '@/dbConfig/dbConfig';
import Contact from '@/models/contactModel'; 

export default async function handler(req, res) {
    await connect();
     if (req.method === 'POST') {
    try {
        const {_id} = req.body;
        const contact = await Contact.findByIdAndUpdate(_id, {isResolved: true});
      res.status(201).json({ success: true, data: contact });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
