import { connect } from '@/dbConfig/dbConfig';
import Profile from '@/models/profileModel';
import InsuranceProduct from '@/models/prodcuts'; // Import InsuranceProduct model
import User from '@/models/userModel';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connect(); // Ensure database connection
    
    try {
      const {
        userId,
        profilePicture,
        panCard,
        policies,
        numberOfPolicies,
        numberOfClaims,
        numberOfDependents,
        address,
        gender,
        bloodGroup,
        emergencyContact,
        emergencyContactNumber,
        emergencyContactRelationship,
        emergencyContactAddress,
        maritalStatus,
        insuranceProducts,
      } = req.body;
      
      
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
     
    
      let existingProfile = await Profile.findOne({ user: userId });
    
      if (existingProfile) {
        // Update profile details if it already exists
        if(existingProfile.profileupdated>2){
          return res.status(400).json({ error: 'Profile update limit reached' });
        }
        Object.assign(existingProfile, {
          profilePicture: profilePicture !== undefined && profilePicture !== '' ? profilePicture : existingProfile.profilePicture,
          panCard: panCard !== undefined && panCard !== '' ? panCard : existingProfile.panCard,
          policies: policies !== undefined && policies !== '' ? policies : existingProfile.policies,
          numberOfPolicies: numberOfPolicies !== undefined && numberOfPolicies !== '' ? numberOfPolicies : existingProfile.numberOfPolicies,
          numberOfClaims: numberOfClaims !== undefined && numberOfClaims !== '' ? numberOfClaims : existingProfile.numberOfClaims,
          numberOfDependents: numberOfDependents !== undefined && numberOfDependents !== '' ? numberOfDependents : existingProfile.numberOfDependents,
          address: address !== undefined && address !== '' ? address : existingProfile.address,
          gender: gender !== undefined && gender !== '' ? gender : existingProfile.gender,
          bloodGroup: bloodGroup !== undefined && bloodGroup !== '' ? bloodGroup : existingProfile.bloodGroup,
          emergencyContact: emergencyContact !== undefined && emergencyContact !== '' ? emergencyContact : existingProfile.emergencyContact,
          emergencyContactNumber: emergencyContactNumber !== undefined && emergencyContactNumber !== '' ? emergencyContactNumber : existingProfile.emergencyContactNumber,
          emergencyContactRelationship: emergencyContactRelationship !== undefined && emergencyContactRelationship !== '' ? emergencyContactRelationship : existingProfile.emergencyContactRelationship,
          emergencyContactAddress: emergencyContactAddress !== undefined && emergencyContactAddress !== '' ? emergencyContactAddress : existingProfile.emergencyContactAddress,
          maritalStatus: maritalStatus !== undefined && maritalStatus !== '' ? maritalStatus : existingProfile.maritalStatus,
          profileupdated:existingProfile.profileupdated+1
        });
        

        if (insuranceProducts && Array.isArray(insuranceProducts)) {
          existingProfile.insuranceProducts = insuranceProducts;
        }

        await existingProfile.save();

        return res.status(200).json({ success: 'Profile updated successfully' });
      }

      // Create a new profile if it doesn't exist
      const newProfile = new Profile({
        user: userId,
        profilePicture: profilePicture || '',
        panCard: panCard || '',
        policies: policies || [],
        numberOfPolicies: numberOfPolicies || 0,
        numberOfClaims: numberOfClaims || 0,
        numberOfDependents: numberOfDependents || 0,
        address: address || '',
        gender: gender || '',
        bloodGroup: bloodGroup || '',
        emergencyContact: emergencyContact || '',
        emergencyContactNumber: emergencyContactNumber || '',
        emergencyContactRelationship: emergencyContactRelationship || '',
        emergencyContactAddress: emergencyContactAddress || '',
        maritalStatus: maritalStatus || '',
        insuranceProducts: insuranceProducts || []
      });

      await newProfile.save();

      return res.status(200).json({ success: 'Profile created successfully' });
    } catch (error) {
      console.error('Error in profile API:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
