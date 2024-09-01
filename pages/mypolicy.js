import { useState, useEffect } from 'react';
import { FaMoneyBillAlt, FaClock, FaShieldAlt, FaInfoCircle, FaCalendarAlt, FaKey, FaSpinner } from 'react-icons/fa';

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

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-gray-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-6 text-gray-800">Insurance Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.insurance.map((insuranceProduct, index) => {
          const relatedOrders = user.orders.filter(order =>
            order.insuranceProducts && order.insuranceProducts.includes(insuranceProduct._id)
          );

          // Use a Set to store unique policies
          const uniquePolicies = new Set();

          relatedOrders.forEach(order => {
            if (order.policies) {
              order.policies.forEach(policy => uniquePolicies.add(policy));
            }
          });

          return (
            <div key={insuranceProduct._id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-700">
                  {index % 2 === 0 ? <FaShieldAlt className="text-blue-500 mr-2" /> : <FaInfoCircle className="text-yellow-500 mr-2" />}
                  {insuranceProduct.name}
                </h2>
                <div className="flex items-center mb-2 text-gray-600">
                  <FaMoneyBillAlt className="mr-2" />
                  <p>Base Premium: ${insuranceProduct.basePremium}</p>
                </div>
                <div className="flex items-center mb-2 text-gray-600">
                  <FaClock className="mr-2" />
                  <p>Tenure: {insuranceProduct.tenure} years</p>
                </div>
                <div className="flex items-center mb-2 text-gray-600">
                  <FaShieldAlt className="mr-2" />
                  <p>Tier: {insuranceProduct.tier}</p>
                </div>
                <div className="flex items-center mb-2 text-gray-600">
                  <FaInfoCircle className="mr-2" />
                  <p>Type: {insuranceProduct.type}</p>
                </div>
              </div>
              {[...uniquePolicies].map((policy, policyIndex) => (
                <div className="bg-gray-100 px-6 py-4 border-t" key={policyIndex}>
                  <div>
                    <p className="flex items-center text-gray-700">
                      <FaKey className="mr-2" />
                      Policy Number: <span className="font-semibold">{policy.Number}</span>
                    </p>
                    <p className="flex items-center text-gray-700">
                      <FaCalendarAlt className="mr-2" />
                      Policy Start Date: {new Date(policy.policyStartDate).toLocaleDateString()}
                    </p>
                    <p className={`flex items-center ${
                      new Date(policy.policyEndDate) < new Date() ? 'text-red-500' :
                      new Date(policy.policyEndDate) - new Date() < 30 * 24 * 60 * 60 * 1000 ? 'text-yellow-500' : 'text-gray-700'}`}>
                      <FaCalendarAlt className="mr-2" />
                      Policy End Date: {new Date(policy.policyEndDate).toLocaleDateString()}
                      {new Date(policy.policyEndDate) < new Date() ? ' Expired' :
                      new Date(policy.policyEndDate) - new Date() < 30 * 24 * 60 * 60 * 1000 ? ' Expiring Soon' : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsuranceTable;
