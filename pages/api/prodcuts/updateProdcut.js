import { connect } from '@/dbConfig/dbConfig';
import InsuranceProduct from '@/models/prodcuts'; // Corrected typo in import statement

export default async function handler(req, res) {
  await connect();

  if (req.method === 'POST') {
    try {
      const { productId, name, type, tier, tenure, basePremium, coverageOptions, additionalFeatures, coverageDetails } = req.body;

      if (!productId) {
        return res.status(400).json({ message: 'Product Id is required for this action' });
      }

      const updateProduct = await InsuranceProduct.findById(productId);

      if (!updateProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Update only the fields provided in the request body
      const fieldsToUpdate = {};
      if (name !== undefined) {
        fieldsToUpdate.name = name;
      }
      if (type !== undefined) {
        fieldsToUpdate.type = type;
      }
      if (tier !== undefined) {
        fieldsToUpdate.tier = tier;
      }
      if (tenure !== undefined) {
        fieldsToUpdate.tenure = tenure;
      }
      if (basePremium !== undefined) {
        fieldsToUpdate.basePremium = basePremium;
      }
      if (coverageOptions !== undefined) {
        fieldsToUpdate.coverageOptions = coverageOptions;
      }
      if (additionalFeatures !== undefined) {
        fieldsToUpdate.additionalFeatures = additionalFeatures;
      }
      if (coverageDetails !== undefined) {
        fieldsToUpdate.coverageDetails = coverageDetails;
      }

      // Update the product with the provided fields
      const updatedProduct = await InsuranceProduct.findByIdAndUpdate(productId, fieldsToUpdate, { new: true });

      res.status(201).json(updatedProduct);
    } catch (error) {
      console.error('Failed to add/update product:', error.message);
      res.status(500).json({ message: 'Failed to add/update product', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
