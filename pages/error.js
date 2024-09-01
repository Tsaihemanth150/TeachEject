// pages/404.js

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push(`${process.env.NEXT_PUBLIC_SITE_URL}`);
    }, 2000); // 2 seconds

    return () => clearTimeout(redirectTimer); // Clear the timer on component unmount
  }, []); // Run only once on component mount

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl">Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default Custom404;
