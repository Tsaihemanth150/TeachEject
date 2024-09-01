import { connect } from '@/dbConfig/dbConfig'; // Assuming you have a connect function in utils/db.js
import contact from '@/models/contactModel';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connect(); 

      const {  name,email, desc } = req.body;
      if (!name || !email || !desc) {
        return res.status(400).json({ error: 'All fields are required' });
      }
         const detils = new contact({
            name,
            email,
            desc,
         })

         await detils.save();
     
      res.status(201).json({ success:"We Will reach you Soon !!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
