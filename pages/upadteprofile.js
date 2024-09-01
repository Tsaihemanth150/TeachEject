import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import Link from "next/link";
import jwt from 'jsonwebtoken';

const UpdateProfile = () => {
    const router = useRouter();
    const [userId, setUserId] = useState('');
    const [panCard, setPanCard] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [numberOfDependents, setNumberOfDependents] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'panCard') {
            setPanCard(value);
        } else if (name === 'address') {
            setAddress(value);
        } else if (name === 'gender') {
            setGender(value);
        } else if (name === 'bloodGroup') {
            setBloodGroup(value);
        } else if (name === 'numberOfDependents') {
            setNumberOfDependents(value);
        } else if (name === 'maritalStatus') {
            setMaritalStatus(value);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwt.decode(token, "your_secret_here");
                setUserId(decodedToken.id);
            }
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { userId, panCard, gender, bloodGroup, address, numberOfDependents, maritalStatus };
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/addProfiles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        let response = await res.json();
        setPanCard('');
        setAddress('');
        setGender('');
        setBloodGroup('');
        setUserId('');
        setNumberOfDependents('');
        setMaritalStatus('');
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
                        <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Update Your Profile
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" method="POST">
                            <div>
                                <label htmlFor="maritalStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Marital Status</label>
                                <input type="text" value={maritalStatus} onChange={handleChange} name="maritalStatus" id="maritalStatus" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Married" required="" />
                            </div>
                            <div>
                                <label htmlFor="panCard" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pan Card</label>
                                <input type="text" value={panCard} onChange={handleChange} name="panCard" id="panCard" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABCDE123X" required="" />
                            </div>
                            <div>
                                <label htmlFor="numberOfDependents" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Dependents</label>
                                <input type="number" value={numberOfDependents} onChange={handleChange} name="numberOfDependents" id="numberOfDependents" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required="" />
                            </div>
                            <div>
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                <input type="text" value={gender} onChange={handleChange} name="gender" id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="gender" required="" />
                            </div>
                            <div>
                                <label htmlFor="bloodGroup" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blood Group</label>
                                <input type="text" value={bloodGroup} onChange={handleChange} name="bloodGroup" id="bloodGroup" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="O+ve" required="" />
                            </div>
                            <div>
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input type="text" value={address} onChange={handleChange} name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" required="" />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" name="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" onChange={() => setAcceptTerms(!acceptTerms)} />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</Link></label>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-teal-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
                        </form>
                        <div className="mx-36">
                            <Link href="/dashboard" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-zinc-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br /><br /><br /><br /><br />
        </section>
    );
};

export default UpdateProfile;
