
import React, { use, useState } from 'react';
import { useEffect } from 'react';
export default function AddProductPage() {
  const [productId, setProductId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    tier: '',
    tenure: '',
    basePremium: '',
    coverageOptions: [{ name: '', premium: '' }],
    additionalFeatures: [''],
    coverageDetails: {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleCoverageOptionChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const updatedCoverageOptions = [...prevData.coverageOptions];
      updatedCoverageOptions[index] = { ...updatedCoverageOptions[index], [name]: value };
      return { ...prevData, coverageOptions: updatedCoverageOptions };
    });
  };

  const handleAdditionalFeatureChange = (index, e) => {
    const { value } = e.target;
    const updatedAdditionalFeatures = [...formData.additionalFeatures];
    updatedAdditionalFeatures[index] = value;
    setFormData(prevData => ({ ...prevData, additionalFeatures: updatedAdditionalFeatures }));
  };

  const handleAddCoverageOption = () => {
    setFormData(prevData => ({ ...prevData, coverageOptions: [...prevData.coverageOptions, { name: '', premium: '' }] }));
  };

  const handleAddAdditionalFeature = () => {
    setFormData(prevData => ({ ...prevData, additionalFeatures: [...prevData.additionalFeatures, ''] }));
  };
  useEffect(() => {
    const productId = localStorage.getItem('productId');
    setProductId(productId);

  }, []);
  const requestBody = {
  productId: productId,
  ...formData
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/prodcuts/updateProdcut', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (response.ok) {
      
        // Provide feedback to the user upon success
        alert('Product added successfully!');
        // Reset form after successful submission
        setFormData({
          name: '',
          type: '',
          tier: '',
          tenure: '',
          basePremium: '',
          coverageOptions: [{ name: '', premium: '' }],
          additionalFeatures: [''],
          coverageDetails: {},
         
        });
        setProductId('');
      } else {
        const data = await response.json();
        console.error('Failed to add product:', data.message);
        // Provide feedback to the user upon failure
        alert('Failed to add product. Please try again.');
      }
    } catch (error) {
      console.error('Failed to add product:', error.message);
      // Provide feedback to the user upon failure
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Add Insurance Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-lg">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}  className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="type" className="text-lg">Type:</label>
          <input type="text" id="type" name="type" value={formData.type} onChange={handleChange}  className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tier" className="text-lg">Tier:</label>
          <input type="text" id="tier" name="tier" value={formData.tier} onChange={handleChange}  className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tenure" className="text-lg">Tenure:</label>
          <input type="number" id="tenure" name="tenure" value={formData.tenure} onChange={handleChange}  className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="basePremium" className="text-lg">Base Premium:</label>
          <input type="number" id="basePremium" name="basePremium" value={formData.basePremium} onChange={handleChange}  className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
        </div>
        {/* Coverage Options */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Coverage Options</h2>
          {formData.coverageOptions.map((coverageOption, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <label htmlFor={`coverageName${index}`} className="text-lg">Name:</label>
              <input type="text" id={`coverageName${index}`} name="name" value={coverageOption.name} onChange={(e) => handleCoverageOptionChange(index, e)} className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
              <label htmlFor={`coveragePremium${index}`} className="text-lg">Premium:</label>
              <input type="number" id={`coveragePremium${index}`} name="premium" value={coverageOption.premium} onChange={(e) => handleCoverageOptionChange(index, e)} className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
            </div>
          ))}
          <button type="button" onClick={handleAddCoverageOption} className="text-blue-500">Add Coverage Option</button>
        </div>
        {/* Additional Features */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Additional Features</h2>
          {formData.additionalFeatures.map((feature, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <label htmlFor={`additionalFeature${index}`} className="text-lg">Additional Feature:</label>
              <input type="text" id={`additionalFeature${index}`} name={`additionalFeature${index}`} value={feature} onChange={(e) => handleAdditionalFeatureChange(index, e)}  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
            </div>
          ))}
          <button type="button" onClick={handleAddAdditionalFeature} className="text-blue-500">Add Additional Feature</button>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Product</button>
      </form>
    </div>
  );
}
