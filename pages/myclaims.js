import Head from 'next/head';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyClaimsPage() {
  const [claims, setClaims] = useState([]);
  const [user, setUser] = useState({});
  const [claimDetails, setClaimDetails] = useState([]);

  const handleClaimRequest = async (_id) => {
    try {
      const res = await fetch("/api/users/addclaim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.user._id,
          insuranceProducts: _id,
        }),
      });

    

      const data = await res.json();

      if (data.success) {
        toast.success('Claim requested Added Successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
  useEffect(() => {
    const fetchClaimDetails = async () => {
      try {
        const response = await fetch("/api/users/getClaims", {
          method: "POST",
          headers: {  
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: user.user._id }), // Assuming user state contains _id directly
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch claim details');
        }
    
        const data = await response.json();
        setClaimDetails(data); // Update the claimDetails state here
      } catch (error) {
        console.error('Error fetching claim details:', error);
        // Handle the error, perhaps show a message to the user
      }
    };
    
      fetchClaimDetails();
 
  }, [user]); // Adding user as a dependency
  

  

  return (
    <div>
      <Head>
        <title>My Claims</title>
        <meta name="description" content="View and manage your claims" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-8">My Claims</h1>


{/* Claims List */}
<div className="mb-8">
  <h2 className="text-xl font-semibold mb-4">Claims List</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    {claimDetails.map((claimDetail) => (
      <div key={claimDetail.claimNumber} className={`bg-gray-100 rounded-lg shadow-md p-6 ${claimDetail.claimStatus === 'Pending' ? 'border-yellow-400' : claimDetail.claimStatus === 'Approved' ? 'border-green-400' : 'border-red-400'}`}>
        <h3 className={`text-lg font-semibold mb-2 ${claimDetail.claimStatus === 'Pending' ? 'text-yellow-600' : claimDetail.claimStatus === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>Claim Status: {claimDetail.claimStatus}</h3>
        <p className="text-gray-500 mb-2">Claim Number: {claimDetail.claimNumber}</p>
        <p className="text-gray-500">Claim Date: {new Date(claimDetail.claimDate).toLocaleString()}</p>
        <p className="text-black-500 mb-2">Remarks: {claimDetail.comments}</p>
      </div>
    ))}
  </div>
</div>


        {/* Add Claim */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">My Policy</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenure</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Premium</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {user && user.insurance && user.insurance.map((insurance) => (
                <tr key={insurance.name}>
                  <td className="px-6 py-4 whitespace-nowrap">{insurance.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{insurance.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{insurance.tier}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{insurance.tenure}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{insurance.basePremium}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                   <button onClick={() => handleClaimRequest(insurance._id)} className='bg-blue-300 rounded-md px-2'>Add claim request</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
