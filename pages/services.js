import React from "react";
import Link from "next/link";
import Head from 'next/head';
const Services =()=>{

    return<>
<div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Our Services - TechEject</title>
        <meta name="description" content="Explore the range of insurance services offered by TechEject" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-8">
        <section className="my-12">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">Our Services</h1>
          <p className="text-lg text-center text-gray-700 mb-8">Explore the range of insurance services offered by TechEject</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-center mb-2"><Link href="/info/healthinsurance">Health Insurance</Link></h2>
              <p className="text-gray-700 text-center">Discover our comprehensive health insurance plans tailored to your needs.</p>
            <center><button className="center bg-blue-500 rounded-lg my-3 px-2 py-0 "> <Link href="/prodcut/Health">Buy Now </Link></button>  
            <button className="center bg-yellow-500 rounded-lg mx-1  px-2 py-0 "> <Link href="/info/healthinsurance">More Information  </Link></button></center>  
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-center mb-2"><Link href="/info/lifeinsurance">Life Insurance</Link></h2>
              <p className="text-gray-700 text-center">Protect your loved ones future with our customizable life insurance policies.</p>
              <center><button className="center bg-blue-500 rounded-lg my-3 px-2 py-0 "> <Link href="/prodcut/Life">Buy Now </Link></button>  
            <button className="center bg-yellow-500 rounded-lg mx-1  px-2 py-0 "> <Link href="/info/lifeinsurance">More Information  </Link></button></center>  
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-center mb-2"><Link href="/info/propertyinsurance">Property Insurance</Link></h2>
              <p className="text-gray-700 text-center">Safeguard your assets and property with our comprehensive insurance coverage.</p>
              <center><button className="center bg-blue-500 rounded-lg my-3 px-2 py-0 "> <Link href="/prodcut/Property">Buy Now </Link></button>  
            <button className="center bg-yellow-500 rounded-lg mx-1  px-2 py-0 "> <Link href="/info/propertyinsurance">More Information  </Link></button></center>  
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-center mb-2"><Link href="/info/autoinsurance">Auto Insurance</Link></h2>
              <p className="text-gray-700 text-center">Get peace of mind on the road with our reliable auto insurance solutions.</p>
              <center><button className="center bg-blue-500 rounded-lg my-3 px-2 py-0 "> <Link href="/prodcut/Auto">Buy Now </Link></button>  
            <button className="center bg-yellow-500 rounded-lg mx-1  px-2 py-0 "> <Link href="/info/autoinsurance">More Information  </Link></button></center>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-center mb-2"><Link href="/info/travleinsurance">Travel Insurance</Link></h2>
              <p className="text-gray-700 text-center">Stay protected during your travels with our comprehensive travel insurance plans.</p>
              <center><button className="center bg-blue-500 rounded-lg my-3 px-2 py-0 "> <Link href="/prodcut/Travel">Buy Now </Link></button>  
            <button className="center bg-yellow-500 rounded-lg mx-1  px-2 py-0 "> <Link href="/info/travleinsurance">More Information  </Link></button></center>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-center mb-2"><Link href="/info/businessinsurance">Business Insurance</Link></h2>
              <p className="text-gray-700 text-center">Secure your businesss future with our range of commercial insurance solutions.</p>
              <center><button className="center bg-blue-500 rounded-lg my-3 px-2 py-0 "> <Link href="/prodcut/Business">Buy Now </Link></button>  
            <button className="center bg-yellow-500 rounded-lg mx-1  px-2 py-0 "> <Link href="/info/businessinsurance">More Information  </Link></button></center>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Ready to Get Insured?</h2>
          <p className="text-gray-700 mb-8">Explore our insurance services and protect what matters most to you.</p>
          <Link href="/contactus" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full">Contact Us</Link>
        </section>
      </main>
    </div>
  


    </>
}


export default Services;