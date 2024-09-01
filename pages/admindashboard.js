import React, { useState, useEffect } from "react";
import Sidebar from '../components/sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VictoryPie, VictoryChart, VictoryBar, VictoryAxis } from 'victory';
import Script from 'next/script';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [products, setProducts] = useState([]);
  const [allusers, setAllUsers] = useState([]);
  
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
        setError(error.message || 'Something went wrong');
      }
    };

    const fetchContacts = async () => {
        try {
            const response = await fetch("/api/admin/contacts");
            if (!response.ok) {
                throw new Error('Failed to fetch contacts');
              }
              const contactsData = await response.json();
         
              setContacts(contactsData.data);
        } catch (error) {
            setError(error.message || 'Something went wrong');
        }
    }

    const fetchProducts = async () => {
        try {
            const response = await fetch("/api/prodcuts/getProdcuts");
            if (!response.ok) {
                throw new Error('Failed to fetch products');
              }
              const productsData = await response.json();
       
              setProducts(productsData.data);
        } catch (error) {
            setError(error.message || 'Something went wrong');
        }
    }

    const fetchAllUserData = async () => {
        try {
            const response = await fetch("/api/admin/getAllUsers");
            if (!response.ok) {
                throw new Error('Failed to fetch all users');
              }
              const allusersData = await response.json();
     
              setAllUsers(allusersData.data);
        } catch (error) {
            setError(error.message || 'Something went wrong');
        }
    };

    fetchUserDetails();
    fetchContacts();
    fetchProducts();
    fetchAllUserData();
  }, []);

  const blockedusers = allusers.filter(user => user.isBlocked).length;
  const activeusers = allusers.filter(user => !user.isBlocked).length;
  const unverifiedusers = allusers.filter(user => !user.isVerified).length;
  const verifiedusers = allusers.filter(user => user.isVerified).length;
  const resolvedItems = contacts.filter(contact => contact.isResolved).length;
  const unresolvedItems = contacts.filter(contact => !contact.isResolved).length;
  const basePremiumData = products.map(product => ({
    category: product.type,
    premium: product.basePremium
  }));

  return (
    <>
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
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div>
          {error && <p>Error: {error}</p>}
          {user && (
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-4">Welcome, {user.user.name}!</h1>
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email:
                  </label>
                  <p className="text-gray-700">{user.user.email}</p>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userID">
                  User ID 
                  </label>
                  <p className="text-gray-700">{user.user.userID}</p>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                 Phone Number
                  </label>
                  <p className="text-gray-700">{user.user.phoneNumber}</p>
                </div>
              </div>
            </div>
          )}
          <div className="container mx-auto px-4 flex flex-wrap">
            <div className="w-full sm:w-1/2 px-4 mb-4">
              <h2 className="text-2xl font-bold mb-4">Status in Contacts</h2>
              <div style={{ width: "100%", height: "200px" }}>
                <VictoryPie
                  data={[
                    { x: "Resolved", y: resolvedItems },
                    { x: "Unresolved", y: unresolvedItems },
                  ]}
                  colorScale={["#36A2EB", "#FF6384"]}
                  labels={({ datum }) => `${datum.x}: ${datum.y}`}
                  labelRadius={100}
                />
              </div>
              <div className="text-left mt-2">
                <p className="text-md">
                  Resolved: {resolvedItems}<br/>
                  Unresolved: {unresolvedItems}
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 px-4 mb-4">
              <h2 className="text-2xl font-bold mb-4">Base Premium by Category</h2>
              <VictoryChart
                domainPadding={20}
                width={500}
                height={300}
              >
                <VictoryBar
                  data={basePremiumData}
                  x="category"
                  y="premium"
                />
                <VictoryAxis />
                <VictoryAxis dependentAxis tickFormat={(x) => (`$${x}`)} />
              </VictoryChart>
            </div>
          </div>
          <div className="container mx-auto px-4 flex flex-wrap">
            <div className="w-full sm:w-1/2 px-4 mb-4">
              <h2 className="text-2xl font-bold mb-4">User Active and Block Data</h2>
              <div style={{ width: "100%", height: "200px" }}>
                <VictoryPie
                  data={[
                    { x: "blockedusers", y: blockedusers },
                    { x: "activeusers", y: activeusers },
                  ]}
                  colorScale={["#FF6384", "#36A2EB"]}
                  labels={({ datum }) => `${datum.x}: ${datum.y}`}
                  labelRadius={100}
                />
              </div>
              <div className="text-left mt-2">
                <p className="text-md">
                  blockedusers: {blockedusers}<br/>
                  activeusers: {activeusers}
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 px-4 mb-4">
              <h2 className="text-2xl font-bold mb-4">Verified and Unverified Users Data</h2>
              <div style={{ width: "100%", height: "200px" }}>
                <VictoryPie
                  data={[
                    { x: "unverifiedusers", y: unverifiedusers },
                    { x: "verifiedusers", y: verifiedusers },
                  ]}
                  colorScale={["#FF6384", "#36A2EB"]}
                  labels={({ datum }) => `${datum.x}: ${datum.y}`}
                  labelRadius={100}
                />
              </div>
              <div className="text-left mt-2">
                <p className="text-md">
                  unverifiedusers: {unverifiedusers}<br/>
                  verifiedusers: {verifiedusers}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js" strategy="lazyOnload" />
    </>
  );
};

export default AdminDashboard;
