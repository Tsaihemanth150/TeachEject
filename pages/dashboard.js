import React from "react";
import { useRef, useState , useEffect} from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter  } from "next/router";
import Link from 'next/link';
const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const router = useRouter()
  const handlePolicy = ( )=>{
    router.push('/products')
  }

     useEffect(() => {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    // Function to fetch user details
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

       c     } catch (error) {
     
     }
   };

    fetchUserDetails(); 
  }, []);
    return (
      <div>
        <div class="flex justify-center px-4 pt-4">
          {isVisible && user && (
            <h3 className="text-xl text-opacity-5 font-bold mb-4">
              Welcome, {user.user.name}!
            </h3>
          )}
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="w-full mx-5 max-w-lg text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
              <h3 className="text-xl text-opacity-5 my-5 font-bold mb-4">
                My profile
              </h3>
            </div>
            {user && (
              <div class="flex flex-col items-center pb-10">
              {/* Conditionally render profile picture */}
              {user.profile && user.profile.profilePicture ? (
                <img
                  class="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={user.profile.profilePicture}
                  alt="Profile Picture"
                />
              ) : (
                <div>No profile picture available</div>
              )}
            

                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {user.user.name}
                </h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  Email : {user.user.email}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  User ID : {user.user.userID}
                </span>
                {user.profile && user.profile.gender && (
    <span class="text-sm text-gray-500 dark:text-gray-400">
      Gender: {user.profile.gender}
    </span>
  )}
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  Phone Number: {user.user.phoneNumber}
                </span>
                {user.profile && user.profile.address && (
    <span class="text-sm text-gray-500 dark:text-gray-400">
      Address: {user.profile.address}
    </span>

    
  )}
       
                {user.profile && user.profile.policyNumber && (
    <span class="text-sm text-gray-500 dark:text-gray-400">
      Policy Number: {user.profile.policyNumber}
    </span>
  )}

                <div class="flex mt-4 md:mt-6">
                
                <div className="mx-2">
                  { user && !user.profile &&    <Link
                    href="/updatenominee"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                    Add Nominee
                  </Link>}
                  </div>
                  
                </div>
              </div>
            )}

          
          </div>
          {user && user.profile && user.profile.emergencyContact && (
  <div class="w-full -mx-48 h-auto  max-w-sm text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div>
      <h3 className="text-xl text-opacity-5 my-5 font-bold mb-4">
        My Nominee Details
      </h3>
    </div>
    <div class="flex flex-col items-center pb-10">
      <span class="text-md text-gray-500 dark:text-gray-400">
         Name : {user.profile.emergencyContact}
      </span>
      <span class="text-md text-gray-500 dark:text-gray-400">
         Relationship : {user.profile.emergencyContactRelationship}
      </span>
      <span class="text-md text-gray-500 dark:text-gray-400">
         Contact : {user.profile.emergencyContactNumber}
      </span>
      <span class="text-md text-gray-500 dark:text-gray-400">
         Address : {user.profile.emergencyContactAddress}
      </span>
      <div class="flex mt-4 md:mt-6">
        <Link
          href="/updatenominee"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update Nominee Details  
        </Link>
      </div>
    </div>
  </div>
)}

{user && user.profile && !user.profile.emergencyContact && (
  <div class="w-full -mx-48 h-auto  max-w-sm text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div>
      <h3 className="text-xl text-opacity-5 my-5 font-bold mb-4">
       Please Add Nominee Details
      </h3>
    </div>
    <div class="flex mx-24 mt-4 md:mt-6">
        <Link
          href="/updatenominee"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update Nominee Details  
        </Link>
      </div>
  </div>
)}
{user && user.profile && user.profile.emergencyContact && (
  <div class="w-full mx-4 h-auto  max-w-sm text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div>
      <h3 className="text-xl text-opacity-5 my-5 font-bold mb-4">
        Other Important Details
      </h3>
    </div>
    <div class="flex flex-col items-center pb-10">
    {user.profile && user.profile.bloodGroup && (
    <span class="text-sm text-gray-500 dark:text-gray-400">
      Blood Group: {user.profile.bloodGroup}
    </span>
  )}
    {user.profile && user.profile.maritalStatus && (
    <span class="text-sm text-gray-500 dark:text-gray-400">
      Marital Status : {user.profile.maritalStatus}
    </span>
  )}

{user.profile  && (
    <span class="text-sm text-gray-500 dark:text-gray-400">
      Number of Dependents : {user.profile.numberOfDependents}
    </span>
  )}
           {user.profile && user.profile.panCard && (
    <span class="text-sm text-gray-500 dark:text-gray-400">
      Pan Card: {user.profile.panCard}
    </span>
  )}
     
    </div>
  </div>
)}

        
<div class="w-auto max-w-lg   h-auto text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <div>
    <h3 className="text-xl text-opacity-5 my-5 font-bold mb-4">
      My Policy Related Details
    </h3>
  </div>
  {user && user.profile && user.profile.numberOfPolicies!==0  ? ( // Checking if user and user.profile are defined, and numberOfPolicies is not zero
    <div class="flex flex-col items-center pb-10">
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        Number of Policies: {user.profile.numberOfPolicies}
        <br />
        Number of Claims: {user.profile.numberOfClaims}
      </h5>
   
      <div class="flex mt-4 md:mt-6">
        <Link
          href="#"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Renew Policy
        </Link>
        <Link
          href="/myclaims"
          class="inline-flex items-center mx-1 px-4 py-2 text-sm font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          View Claims
        </Link>
        <Link
          href="/mypolicy"
          class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          View Policy
        </Link>

        <Link
          href="/myorders"
          class="py-2 px-4 bg-gray-300 ms-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          View Order
        </Link>
      </div>
    </div>
  ) : (
    <div>
    <p className="text-gray-600">You dont have any existing policies. Please update your profile to buy a policy</p>
    {user && !user.profile ? (
        <Link
            href="/upadteprofile"
            className="inline-flex items-center my-2 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            Add Profile
        </Link>
    ) : (
        <button className="bg-blue-300 my-3 rounded-md px-2" onClick={handlePolicy}>Buy Policy</button>
    )}
</div>

  )}
</div>


        </div> 
      </div>
    );
};

export default Dashboard;