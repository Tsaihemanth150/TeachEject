// pages/tools.js

import Head from 'next/head';
import Link from 'next/link';

const ToolsPage = () => {
  return (
    <div className="container mx-auto py-8">
      <Head>
        <title>Tools Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold mb-4">Available Tools</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Deposit Calculator</h2>
          <p className="text-gray-600">
            Calculate the interest earned on your deposits.
          </p>
          <Link href="/tools/depositcalulator">
          <button className='bg-blue-400 px-2 py-1 rounded-md'>get started</button> 
          </Link>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Inflation Calculator</h2>
          <p className="text-gray-600">
            Estimate the future value of money with inflation taken into account.
          </p>
          <Link href="/tools/inflation">
           <button className='bg-blue-400 px-2 py-1 rounded-md'>get started</button> 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
