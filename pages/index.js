// pages/index.js

import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiClipboard, FiUserCheck, FiPhoneCall, FiDollarSign, FiShield, FiCheckCircle } from 'react-icons/fi';

export default function Home() {
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  useEffect(() => {
    const time = process.env.NEXT_PUBLIC_BANNER_TIMEOUT || 3000;
    const timer = setTimeout(() => {
      setIsBannerOpen(false);
    }, time);

    return () => clearTimeout(timer); // Cleanup timer if component unmounts
  }, []);

  const closeBanner = () => {
    setIsBannerOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>TechEject - Health & Life Insurance</title>
        <meta name="description" content="TechEject - Your partner in health and life insurance solutions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {isBannerOpen && (
          <div className="relative isolate mx-28 rounded-lg flex items-center gap-x-6 overflow-hidden bg-gray-50 px-10 py-2 sm:px-3.5 sm:before:flex-1">
            <div
              className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
              aria-hidden="true"
            >
              <div
                className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#342f82] to-[#b306d1] opacity-30"
                style={{
                  clipPath:
                    'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                }}
              />
            </div>
            <div
              className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
              aria-hidden="true"
            >
              <div
                className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#4ac948] to-[#0a0276] opacity-30"
                style={{
                  clipPath:
                    'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                }}
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <p className="text-sm leading-6 text-gray-900">
                The sale is on from the 1st Jan to 2nd July. Use <strong className="font-semibold">newyear2024</strong> and <strong className="font-semibold">TechEject40</strong> to get 20% off.
              </p>
              <Link
                href="/products"
                className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                Buy Now <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <div className="relative isolate flex items-center gap-x-6 overflow-hidden px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
              <div className="flex flex-1 justify-end">
                <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]" onClick={closeBanner}>
                  <span className="sr-only">Dismiss</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">Welcome to <span className="text-indigo-700">TechEject</span></h1>
        <p className="text-lg text-center text-gray-700 mb-8">Your partner in health and life insurance solutions</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <img src="/Health.jpeg" alt="Health Insurance" className="w-24 rounded-md h-24 mb-4" />
            <h3 className="text-xl font-semibold text-center mb-2">Health Insurance</h3>
            <p className="text-gray-700 text-center">Explore our range of health insurance plans tailored to your needs.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <img src="/life.jpeg" alt="Life Insurance" className="w-24 rounded-md h-24 mb-4" />
            <h3 className="text-xl font-semibold text-center mb-2">Life Insurance</h3>
            <p className="text-gray-700 text-center">Secure your loved ones future with our customizable life insurance policies.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <img src="property.jpeg" alt="Property Insurance" className="w-24 rounded-md h-24 mb-4" />
            <h3 className="text-xl font-semibold text-center mb-2">Property Insurance</h3>
            <p className="text-gray-700 text-center">Protect your assets and property with our comprehensive insurance coverage.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <img src="/business.jpeg" alt="Investment Planning" className="w-24  rounded-md h-24 mb-4" />
            <h3 className="text-xl font-semibold text-center mb-2">Investment Planning</h3>
            <p className="text-gray-700 text-center">Grow your wealth and plan for the future with our expert investment strategies.</p>
          </div>
        </div>

        <section className="my-12">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FiClipboard className="text-blue-700 text-4xl mb-2" />
          <h3 className="text-xl font-semibold text-center mb-2">Customized Plans</h3>
          <p className="text-gray-700 text-center">We offer personalized insurance plans tailored to your unique needs and preferences.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FiUserCheck className="text-blue-700 text-4xl mb-2" />
          <h3 className="text-xl font-semibold text-center mb-2">Expert Advice</h3>
          <p className="text-gray-700 text-center">Our team of experienced advisors will guide you through every step of the insurance process.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FiPhoneCall className="text-blue-700 text-4xl mb-2" />
          <h3 className="text-xl font-semibold text-center mb-2">24/7 Support</h3>
          <p className="text-gray-700 text-center">Get assistance and support whenever you need it with our round-the-clock customer service.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FiDollarSign className="text-blue-700 text-4xl mb-2" />
          <h3 className="text-xl font-semibold text-center mb-2">Affordable Rates</h3>
          <p className="text-gray-700 text-center">We provide competitive pricing to ensure you get the best value for your insurance needs.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FiShield className="text-blue-700 text-4xl mb-2" />
          <h3 className="text-xl font-semibold text-center mb-2">Comprehensive Coverage</h3>
          <p className="text-gray-700 text-center">Our plans offer extensive coverage options to protect you and your assets.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FiCheckCircle className="text-blue-700 text-4xl mb-2" />
          <h3 className="text-xl font-semibold text-center mb-2">Easy Claims Process</h3>
          <p className="text-gray-700 text-center">Experience a hassle-free claims process with our efficient and supportive team.</p>
        </div>
      </div>
    </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700">TechEject made finding the right insurance plan so easy. I highly recommend them!</p>
              <span className="block text-right mt-4">- John Doe</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700">Excellent service and great coverage options. Thank you, TechEject!</p>
              <span className="block text-right mt-4">- Jane Smith</span>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Ready to get started?</h2>
          <p className="text-gray-700 mb-8">Explore our insurance plans and secure your future today.</p>
          <Link href="/contactus" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full">
            Contact Us
          </Link>
        </section>
      </main>
    </div>
  );
}
