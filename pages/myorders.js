import React, { useState, useEffect } from 'react';
import { FaMoneyBillAlt, FaClock, FaShieldAlt, FaInfoCircle, FaCalendarAlt, FaKey } from 'react-icons/fa';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';
import logoImage from '../public/logo.jpeg'; 
import { Image, View } from '@react-pdf/renderer';
const InsuranceTable = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/users/getUserDeatils", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);
 
  

  // Function to generate the PDF document
  const generatePDF = (insuranceProduct,users) => {
    const MyDocument = (
        <Document>
      <Page size="A4" >
       
        <View >
        
        
          <Text >Order Details</Text>
          <Text>Name: {user.name}</Text>
          <Text>Order ID: {insuranceProduct.OrderID}</Text>
          <Text>Amount Paid: {insuranceProduct.Amount}</Text>
          <Text>Order Status: {insuranceProduct.status}</Text>
          <Text>Payment Method: {insuranceProduct.paymentMehtod}</Text>
          <Text>Payment Details: {insuranceProduct.paymnetDetails}</Text>
        </View>
        {insuranceProduct.policies && insuranceProduct.policies.map((policy, index) => (
          <View key={index} >
            <Text>Policy Number: {policy.Number}</Text>
            <Text>Policy Start Date: {new Date(policy.policyStartDate).toLocaleDateString()}</Text>
            <Text>Policy End Date: {new Date(policy.policyEndDate).toLocaleDateString()}</Text>
          </View>
        ))}
      </Page>
    </Document>
    );

    return MyDocument;
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center font-bold mb-4">My Orders</h1>
      <div className="grid my-2grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {user.orders.map((insuranceProduct, index) => (
          <div key={insuranceProduct._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <h2 className="text-lg font-bold mb-2 flex items-center">{index % 2 === 0 ? <FaShieldAlt className="text-blue-500 mr-2" /> : <FaInfoCircle className="text-yellow-500 mr-2" />}{insuranceProduct.OrderID}</h2>
              <div className="flex items-center mb-2">
                <FaMoneyBillAlt className="text-gray-500 mr-2" />
                <p className="text-gray-700">Amount Paid: {insuranceProduct.Amount}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaClock className="text-gray-500 mr-2" />
                <p className="text-gray-700">Order Status: {insuranceProduct.status}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaShieldAlt className="text-gray-500 mr-2" />
                <p className="text-gray-700">Payment Method: {insuranceProduct.paymentMehtod}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaInfoCircle className="text-gray-500 mr-2" />
                <p className="text-gray-700">Payment Details: {insuranceProduct.paymnetDetails}</p>
              </div>
            </div>

            <div className="bg-gray-100 px-6 py-4 border-t">
              <PDFDownloadLink
                document={generatePDF(insuranceProduct)}
                fileName={`order-details-${insuranceProduct.OrderID}.pdf`}
                className="bg-blue-500 my-1 text-white py-2 px-4 rounded-lg mx-1"
              >
                {({ loading }) => (loading ? 'Generating PDF...' : 'Get PDF')}
              </PDFDownloadLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsuranceTable;
