import { connect } from '@/dbConfig/dbConfig';
import Profile from '@/models/profileModel';
import InsuranceProduct from '@/models/prodcuts'; // Corrected typo in the import statement
import Orders from '@/models/orders';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connect(); 
    
    try {
      const { amountToPay, paymentDetails, userID, product } = req.body;
      const keysArray = Object.keys(paymentDetails);
      const valuesArray = Object.values(paymentDetails);
      const keysString1 = [ keysArray ].join(', ');
      const valuesString1 = [ valuesArray ].join(', ');
      
      
      
      // Find the user's profile
      const existingProfile = await Profile.findOne({ user: userID });
      if (!existingProfile) {
        return res.status(404).json({ error: 'User profile not found' });
      }

      const time = product.tenure;
      function generatePolicyNumber() {
        const prefix = "PLCY";
        const randomDigits = Math.floor(Math.random() * 100000); // Generate 5 random digits
        const formattedRandomDigits = randomDigits.toString().padStart(5, '0'); // Ensure 5 digits with leading zeros if needed
        return prefix + formattedRandomDigits;
      }
    
      // Example usage:
      const policyNumber = generatePolicyNumber();
      
      // Check for existing orders with null orderId
      const existingNullOrders = await Orders.find({ orderId: null });
      if (existingNullOrders.length > 0) {
        // If there are existing orders with null orderId, throw an error
        throw new Error('Existing orders with null orderId found');
      }

      // Generate a unique orderId
      let orderId;
      let orderExists = true;
      while (orderExists) {
        const randomDigits = Math.floor(Math.random() * 100000); 
        orderId = `TCORD-${randomDigits}`;
        const existingOrder = await Orders.findOne({ orderId: orderId });
        if (!existingOrder) {
          orderExists = false;
        }
      }

      // Create the order
     // Create the order
const order = await Orders.create({
  user: userID,
  orderId: orderId,
  address: existingProfile.address,
  gender: existingProfile.gender,
  insuranceProducts: [product._id],
  policies: [{
    Number: policyNumber,
    policyStartDate: new Date(),
    policyEndDate: new Date(Date.now() + time * 24 * 60 * 60 * 1000),
  }],
  amount: amountToPay,
  paymentMehtod: keysString1, // Store keys as an array
  paymnetDetails: valuesString1, // Store values as an array
});


      // Save the order
      await order.save();

      return res.status(200).json({ success: 'Order created successfully', order });
    } catch (error) {
      console.error('Error in profile API:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
