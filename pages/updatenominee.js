import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

var jwt = require('jsonwebtoken');
const Signup = () => {
    const router = useRouter();
    const [userId, setUserId] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
    const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
    const [emergencyContactRelationship, setEmergencyContactRelationship] = useState('');
    const [emergencyContactAddress, setEmergencyContactAddress] = useState('');
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'emergencyContact') {
            setEmergencyContact(value);
        } else if (name === 'emergencyContactNumber') {
            setEmergencyContactNumber(value);
        } else if (name === 'emergencyContactRelationship') {
            setEmergencyContactRelationship(value);
        } else if (name === 'emergencyContactAddress') {
            setEmergencyContactAddress(value);
        } 
    };
    useEffect(() => {
        // Check if `localStorage` is available (ensure we're on the client-side)
        if (typeof window !== 'undefined') {
          // Retrieve token from localStorage
          const token = localStorage.getItem('token');
      
          // Check if token exists
          if (token) {
            // Token exists, you can proceed with using it
      
      
            // Example usage: Decode token using JWT
            const decodedToken = jwt.decode(token, process.env.Token_SECERT);
            setUserId(decodedToken.id);
          } else {
            // Token does not exist in local storage
  
          }
        }
      }, []); // Ru
          
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { userId, emergencyContact,emergencyContactNumber,emergencyContactRelationship,emergencyContactAddress};
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/addProfiles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    


    let response = await res.json();
    setEmergencyContact('');
    setEmergencyContactNumber('');
    setEmergencyContactRelationship('');
    setEmergencyContactAddress('');
    setUserId('');
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
        router.push(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`);
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
        <section className="bg-gray-50 dark:bg-gray-900">
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
            <br /><br /><br /><br />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="logo.jpeg" alt="logo" />
                    TechEject
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                          Update Nominee Deatils
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" method="POST">
                            <div>
                                <label htmlFor="emergencyContact" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nominee Name</label>
                                <input type="text" value={emergencyContact} onChange={handleChange} name="emergencyContact" id="emergencyContact" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required="" />
                            </div>
                            <div>
                                <label htmlFor="emergencyContactNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nominee Number</label>
                                <input type="number" value={emergencyContactNumber} onChange={handleChange} name="emergencyContactNumber" id="emergencyContactNumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone number" required="" />
                            </div>
                            <div>
                                <label htmlFor="emergencyContactRelationship" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Relationship</label>
                                <input type="text" value={emergencyContactRelationship} onChange={handleChange} name="emergencyContactRelationship" id="emergencyContactRelationship" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="relation" required="" />
                            </div>
                            <div>
                                <label htmlFor="emergencyContactAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input type="text" value={emergencyContactAddress} onChange={handleChange} name="emergencyContactAddress" id="emergencyContactAddress" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" required="" />
                            </div>
                            
                            
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" required href="#">Terms and Conditions</Link></label>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-teal-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
                          
                        </form>
                        <div className="mx-36"> <Link 
                    href="/dashboard"
                    class="py-2  px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-zinc-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Back
                  </Link></div>
                    </div>
                </div>
            </div>
            <br /><br /><br /><br /><br /><br />
        </section>
    );
};

export default Signup;
