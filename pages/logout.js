import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";

function Logout() {
  const router = useRouter();
  const [logoutMessage, setLogoutMessage] = useState('');

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.post('/api/auth/logout');
        setLogoutMessage(response.data.message);
          router.push('/');
       
      } catch (error) {
        console.error('Logout failed:', error);
        setLogoutMessage('Logout failed');
      }
    };

    logout();
  }, []);
   

  return (
    <div>
      <p>{logoutMessage}</p>
      {/* You can add additional content here if needed */}
    </div>
  );
}

export default Logout;
