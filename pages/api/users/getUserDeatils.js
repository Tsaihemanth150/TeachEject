import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import Profile from '@/models/profileModel';
import jwt from 'jsonwebtoken';
import InsuranceProduct from '@/models/prodcuts';
import Order from '@/models/orders';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connect(); 

    // Extract token from the request headers
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        console.error('No token found');
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Verify the JWT token and decode it
      const decodedToken = jwt.verify(token, process.env.Token_SECERT);

      // Extract email from the decoded token
      const email = decodedToken.email;

      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
   

      // Find profile by user ID
      const profile = await Profile.findOne({ user: user._id });
      
      if(!profile){
        const response = {
          success: true,
          user: {
            username: user.username,
            _id: user._id,
            email: user.email,
            name: user.name,
            userID: user.userID,
            phoneNumber: user.phoneNumber
          },    
        };
        return res.status(200).json(response);
      }
     

     
     
if (profile && profile.insuranceProducts) {
  const insuranceProductIds = profile.insuranceProducts;
  const orderIds = user.orders;
  // Initialize empty array to store insurance products
  let insurance = [];
  let orders = [];
  // Find insurance products by IDs
  for (const productId of insuranceProductIds) {
    const product = await InsuranceProduct.findById(productId);
    if (product) {
      insurance.push(product);
    }
  }

  for(const orderId of orderIds){
    const order = await Order.findById(orderId);
    if(order){
      orders.push(order);
    }
  }    
  const response = {
    success: true,
    user: {
        username: user.username,
        _id: user._id,
        email: user.email,
        name: user.name,
        userID: user.userID,
        phoneNumber: user.phoneNumber
    },
    profile: {
        profilePicture: profile.profilePicture,
        panCard: profile.panCard,
        policyNumber: profile.policyNumber,
        numberOfPolicies: profile.numberOfPolicies,
        numberOfClaims: profile.numberOfClaims,
        numberOfDependents: profile.numberOfDependents,
        address: profile.address,
        gender: profile.gender,
        bloodGroup: profile.bloodGroup,
        emergencyContact: profile.emergencyContact,
        emergencyContactNumber: profile.emergencyContactNumber,
        emergencyContactRelationship: profile.emergencyContactRelationship,
        emergencyContactAddress: profile.emergencyContactAddress,
        maritalStatus: profile.maritalStatus,
    },
    insurance: insurance.map(insuranceObj => ({
        _id: insuranceObj._id,
        name: insuranceObj.name,
        type: insuranceObj.type,
        tier: insuranceObj.tier,
        tenure: insuranceObj.tenure,
        basePremium: insuranceObj.basePremium,
    })),
    orders: orders.map(orderObj => ({
        OrderID: orderObj.orderId,
        Amount: orderObj.amount,
        status: orderObj.status,
        paymentMehtod: orderObj.paymentMehtod,
        insuranceProducts: orderObj.insuranceProducts,
        paymnetDetails: orderObj.paymnetDetails,
        policies: orderObj.policies.map(policy => ({
            Number: policy.Number,
            policyStartDate: policy.policyStartDate,
            policyEndDate: policy.policyEndDate,
        })),
       
    })),
};

        return res.status(200).json(response);

}else{
      // Prepare response object
      const response = {
        success: true,
        user: {
          username: user.username,
          _id: user._id,
          email: user.email,
          name: user.name,
          userID: user.userID,
          phoneNumber: user.phoneNumber
        },
        profile: {
          profilePicture: profile.profilePicture,
          panCard: profile.panCard,
          policyNumber: profile.policyNumber,
          numberOfPolicies: profile.numberOfPolicies,
          numberOfClaims: profile.numberOfClaims,
          numberOfDependents: profile.numberOfDependents,
          address: profile.address,
          gender: profile.gender,
          bloodGroup: profile.bloodGroup,
          emergencyContact: profile.emergencyContact,
          emergencyContactNumber: profile.emergencyContactNumber,
          emergencyContactRelationship: profile.emergencyContactRelationship,
          emergencyContactAddress: profile.emergencyContactAddress,
          maritalStatus: profile.maritalStatus,
        },
        
      };

      // Return response
      return res.status(200).json(response);
}

         
  


    } catch (error) {
      console.error('Error in fetching user profile:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
