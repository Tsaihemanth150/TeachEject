import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ClaimPage = () => {
  const [eligible, setEligible] = useState(false);
  const [users, setUsers] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingInsurance, setLoadingInsurance] = useState(true);
  const [claimStatus, setclaimStatus] = useState('');
  const [comments, setComments] = useState('');
  const [approvedBy, setApprovedBy] = useState('');
  const [approvedDate, setApprovedDate] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [approvedAmount, setApprovedAmount] = useState('');
  const [reapply, setReapply] = useState('');
  const [claimData, setClaimData] = useState(null);
  
  const router = useRouter();
  const chance = parseInt(process.env.NEXT_PUBLIC_Admin_Upadte_Claim_Chance) + 1;
  useEffect(() => {
    const fetchClaimData = async () => {
      const ClaimId=localStorage.getItem('TempClaimId');
      const data = { ClaimId };


      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/getClaimsbyId`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const claimData = await res.json();

        setClaimData(claimData.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } 
    };

    fetchClaimData();
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      const user = localStorage.getItem('TempUserId');
      const data = { user };

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/claimdeatils`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const userData = await res.json();
        setUsers(userData);
        setEligible(checkEligibility(userData));
      } catch (error) {
        console.error('Error fetching user data:', error);
      
      } finally {
        setLoadingUser(false);
      }
    };
 
    fetchUserData();
  }, []);
  const ineligibilityReason = eligible ? '' : 'user upadte chance is over'
   const checkEligibility = (userData) => {

      const verfied = userData.isVerified;
      const blocked= userData.isBlocked;
      if(claimData.updatecount > process.env.NEXT_PUBLIC_Admin_Upadte_Claim_Chance){
        const ineligibilityReason = eligible ? '' : 'Given chance is over';


        return false;
      }
      if(verfied && !blocked  ){
        return true; 
      }
      return false; 
    };

  useEffect(() => {
    const fetchInsuranceData = async () => {
      const insuranceID = localStorage.getItem('TempInsuranceId');
      const data = { insuranceID };


      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/prodcuts/getProdcutById`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const insuranceData = await res.json();

        setInsurance(insuranceData);
      } catch (error) {
        console.error('Error fetching insurance data:', error);
      } finally {
        setLoadingInsurance(false);
      }
    };

    fetchInsuranceData();
  }, []);
 


  if (loadingUser || loadingInsurance) {
    return <div>Loading...</div>;
  }

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'claimStatus') {
      setclaimStatus(value);
    } else if (name === 'comments') {
      setComments(value);
    } else if (name === 'claimAmount') {
      setClaimAmount(value);
    } else if (name === 'approvedBy') {
      setApprovedBy(value);
    } else if (name === 'approvedDate') {
      setApprovedDate(value);
    } else if (name === 'approvedAmount') {
      setApprovedAmount(value);
    } else if (name === 'reapply') {
        setReapply(value);
    }
};
const handleSubmit = async (e) => {
  const ClaimId=localStorage.getItem('TempClaimId');
  e.preventDefault();

  const data = {   ClaimId,claimStatus, comments, claimAmount, approvedBy, approvedDate, approvedAmount, reapply};
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/updateClaim`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  });

  let response = await res.json();
  setclaimStatus('');
  setComments('');
  setClaimAmount('');
  setApprovedBy('');
  setApprovedDate('');
  setApprovedAmount('');
  setReapply('');
// 
  if (response.success) {
      toast.success(response.success, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
      setTimeout(() => {
          router.push(`${process.env.NEXT_PUBLIC_SITE_URL}/adminclaims`);
      }, 2000);
  } else {
      toast.error(response.error, {
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
};


  return (
    
    <div className="container mx-auto">
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
      <h1 className="text-3xl font-bold mt-8 mb-4">User Policy and Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">User Details</h2>
          {users ? (
            <div>
              <p className="text-gray-600 mb-2"><span className="font-semibold">User ID:</span> {users.userID}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Username:</span> {users.username}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Name:</span> {users.name}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Email:</span> {users.email}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Phone Number:</span> {users.phoneNumber}</p>
            </div>
          ) : (
            <p>No user data available.</p>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Insurance Details</h2>
          {insurance ? (
            <div>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Insurance Name:</span> {insurance.data.name}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Insurance Type:</span> {insurance.data.type}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Insurance Tier:</span> {insurance.data.tier}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Insurance Duration (years):</span> {insurance.data.tenure}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Insurance Base Premium:</span> {insurance.data.basePremium}</p>
            </div>
          ) : (
            <p>No insurance data available.</p>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Eligibility for Claim</h2>
         <div className="flex items-center">
  {eligible ? (
    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
  ) : (
    <XCircleIcon className="h-6 w-6 text-red-500 mr-2" />
  )}
  <p className="text-gray-600">
    {eligible ? 'Eligible for claim' : `Not eligible for claim due to: ${ineligibilityReason}`}
  </p>
</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Action on the Claim Request</h2>
          
          <form onSubmit={handleSubmit}  className="space-y-4 md:space-y-6" method="POST">
    <div>
        <label htmlFor="approvedAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Approved Amount</label>
        <input type="number" disabled={claimData.updatecount > process.env.NEXT_PUBLIC_Admin_Upadte_Claim_Chance}  value={approvedAmount} onChange={handleChange} name="approvedAmount" id="approvedAmount" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10000" required="" />
    </div>
    <div>
        <label htmlFor="claimStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Claim Status</label>
        <select disabled={claimData.updatecount > process.env.NEXT_PUBLIC_Admin_Upadte_Claim_Chance}  value={claimStatus} onChange={handleChange} name="claimStatus" id="claimStatus" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
           <option>Choose Status</option>
            <option value="Approved">Approved</option>
            <option value="Partially Approved">Partially Approved</option>
            <option value="Rejected">Rejected</option>
        </select>
    </div>
    <div>
        <label htmlFor="comments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Update Comment</label>
        <input type="text" disabled={claimData.updatecount > process.env.NEXT_PUBLIC_Admin_Upadte_Claim_Chance}  value={comments} onChange={handleChange} name="comments" id="comments" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Reason" required="" />
    </div>
    <div>
        <label htmlFor="approvedBy" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Approved By</label>
        <input type="text" disabled={claimData.updatecount > process.env.NEXT_PUBLIC_Admin_Upadte_Claim_Chance}  value={approvedBy} onChange={handleChange} name="approvedBy" id="approvedBy" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Admin" required="" />
    </div>
    <div>
        <label htmlFor="approvedDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Approved Date</label>
        <input type="date" disabled={claimData.updatecount > process.env.NEXT_PUBLIC_Admin_Upadte_Claim_Chance}  value={approvedDate} onChange={handleChange} name="approvedDate" id="approvedDate" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="dd-mm-yyyy" required="" />
    </div>
    <div>
        <label htmlFor="reapply" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Can Reapply?</label>
        <select value={reapply} disabled={claimData.updatecount > process.env.NEXT_PUBLIC_Admin_Upadte_Claim_Chance} type="text" onChange={handleChange} name="reapply" id="reapply" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" >
           <option>Choose Can reapply</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
        </select>
    </div>
    <button type="submit" disabled={claimData.updatecount > process.env.NEXT_PUBLIC_Admin_Upadte_Claim_Chance} className="w-full bg-sky-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
</form>
          <div className='text-red-500'>Note:- You can update only {chance} Time </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimPage;
