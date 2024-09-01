import mongoose from 'mongoose';

const insuranceProductSchema = new mongoose.Schema({
 
  name: { type: String},
  type: { type: String },
  tier: { type: String },
  tenure: { type: Number },
  basePremium: { type: Number },
  coverageOptions: [{
    name: { type: String,   },
    premium: { type: Number,   }
  }],
  additionalFeatures: [{ type: String }],
  coverageDetails: { type: Object }
});


const InsuranceProduct = mongoose.models.InsuranceProduct || mongoose.model('InsuranceProduct', insuranceProductSchema);

export default InsuranceProduct;
