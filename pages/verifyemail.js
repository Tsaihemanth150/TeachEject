// pages/verifyemail.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post('/api/auth/verifyemail', { token });
        if (response.status === 200) {
          setVerificationStatus('Email verified successfully!');
        } else {
          setVerificationStatus('Failed to verify email. Please try again 13.');
        }
      } catch (error) {
     
        setVerificationStatus('Failed to verify email. Please try again.');
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  if (!token) {
    // Handle case when token is not provided
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{verificationStatus}</h1>
    </div>
  );
};

export default VerifyEmail;
