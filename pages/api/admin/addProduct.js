// pages/api/addProduct.js
import { connect } from '@/dbConfig/dbConfig';
import InsuranceProduct from '@/models/prodcuts'; // Corrected typo in import statement

export default async function handler(req, res) {
  await connect();

  if (req.method === 'POST') {
    try {
      const { productId, name, type, tier, tenure, basePremium, coverageOptions, additionalFeatures, coverageDetails } = req.body;
      
      const newProduct = new InsuranceProduct({
        productId, // Ensure productId is included in the request body
        name,
        type,
        tier,
        tenure,
        basePremium,
        coverageOptions,
        additionalFeatures,
        coverageDetails
      });

      const product = await newProduct.save();


      res.status(201).json(product);
    } catch (error) {
      console.error('Failed to add product:', error.message);
      res.status(500).json({ message: 'Failed to add product', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
