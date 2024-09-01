// pages/api/deleteProduct.js

import { connect } from '@/dbConfig/dbConfig';
import Product from '@/models/prodcuts'; // Correct the import path for the Product model

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      await connect();
      
      const { id } = req.body; 
      
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }

      // Respond with the deleted product in the response body
      res.status(200).json({ success: true, data: deletedProduct });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
