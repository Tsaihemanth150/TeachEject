import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '@/components/sidebar';
import Script from 'next/script';

const IndexPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  let srno = 1; // Declare srno with let



  const handleUnblockClick = async (userID) => {
   try {
       // Make a POST request to your backend API endpoint to unblock the user
       await axios.post('/api/users/unblock', { userID });

       // If the request is successful, log a message
  
   } catch (error) {
       // If an error occurs, log the error
       console.error('Error unblocking user:', error);
       // You can handle the error in any way appropriate for your application
   }
};

const handleBlockClick = async (userID) => {
   try {
      // Make a POST request to your backend API endpoint to unblock the user
      await axios.post('/api/users/block', { userID });

      // If the request is successful, log a message
   
   } catch (error) {
      // Handle error if the request fails
      console.error('Error unblocking user:', error);
   }
}



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/admin/getAllUsers');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    return user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const resetSrno = () => {
    srno = 1; // Reset srno to 1
  };

  return (


    
    <div className="container">

      <Sidebar />
      <h1>User Details</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {filteredUsers.map(user => (
    <tr key={user.id}>
      <td>{srno++}</td>
      <td>{user.userID}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>
        {user.isBlocked ? (
          <button style={{ backgroundColor: 'Green', borderRadius: '10px', padding: '5px 10px', border: 'none' }}  onClick={() => handleUnblockClick(user.userID)}>
            Unblock User 
          </button>
        ) : (
          <button style={{ backgroundColor: 'red', borderRadius: '10px', padding: '5px 10px', border: 'none' }}  onClick={() => handleBlockClick(user.userID)}>
            Block User 
          </button>
        )}
      </td>
    </tr>
  ))}
  </tbody>
      </table>
    
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        .search-bar {
          margin-bottom: 20px;
        }
        .user-table {
          width: 100%;
          border-collapse: collapse;
        }
        .user-table th, .user-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        .user-table th {
          background-color: #f2f2f2;
        }
        .reset-btn {
          margin-top: 20px;
          padding: 8px 16px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .reset-btn:hover {
          background-color: #45a049;
        }
      `}</style>
      <Script  src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></Script >
    </div>
  );
};

export default IndexPage;
