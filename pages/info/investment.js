// pages/investment.js

import Head from 'next/head';
import { FaDollarSign, FaChartLine, FaCoins, FaUserCog, FaRegClock, FaComments } from 'react-icons/fa';
import Link from 'next/link';

export default function Investment() {
  return (
    <div className="bg-gray-100 min-h-screen">
  <Head>
    <title>TechEject - Investment Planning</title>
    <meta name="description" content="TechEject - Your partner in investment planning and wealth management" />
    <link rel="icon" href="/favicon.ico" />
  </Head>

  <main className="container mx-auto py-8">
    <section className="px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Welcome to <span className="text-indigo-700">TechEject</span></h1>
        <p className="text-lg text-center text-gray-700 mb-8">Your partner in investment planning and wealth management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaDollarSign className="w-24 h-24 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold text-center mb-2"> <Link href="/info/savings">Savings Plans</Link></h3>
          <p className="text-gray-700 text-center">Explore our range of savings plans tailored to your financial goals.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaChartLine className="w-24 h-24 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-center mb-2"><Link href="/info/mutualfunds">Mutual Funds</Link></h3>
          <p className="text-gray-700 text-center">Invest in diversified portfolios with our mutual fund options.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaCoins className="w-24 h-24 text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold text-center mb-2"><Link href="/info/stocks">Stock Trading</Link></h3>
          <p className="text-gray-700 text-center">Dive into the world of stocks and grow your wealth with our trading platform.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaUserCog className="w-24 h-24 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold text-center mb-2"><Link href="/info/retirement">Retirement Planning</Link></h3>
          <p className="text-gray-700 text-center">Secure your retirement with our personalized retirement planning services.</p>
        </div>
      </div>
    </section>

    <section className="px-4 my-12">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaRegClock className="w-24 h-24 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold text-center mb-2">Quick and Efficient</h3>
          <p className="text-gray-700 text-center">We provide quick and efficient investment solutions to meet your financial goals.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaComments className="w-24 h-24 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-center mb-2">Expert Advice</h3>
          <p className="text-gray-700 text-center">Our experienced financial advisors offer expert advice tailored to your investment needs.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaDollarSign className="w-24 h-24 text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold text-center mb-2">High Returns</h3>
          <p className="text-gray-700 text-center">We aim for high returns on your investments while managing risks effectively.</p>
        </div>
      </div>
    </section>

    <section className="px-4 my-12">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">What Our Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700">&quot;TechEject helped me achieve my financial goals with their investment plans. Highly recommended!&quot;</p>
          <span className="block text-right mt-4">- John Doe</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700">&quot;I&apos;ve been with TechEject for years, and they&apos;ve consistently provided excellent investment advice.&quot;</p>
          <span className="block text-right mt-4">- Jane Smith</span>
        </div>
      </div>
    </section>

    <section className="px-4 text-center my-12">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Ready to Grow Your Wealth?</h2>
      <p className="text-gray-700 mb-8">Explore our investment plans and start building your financial future today.</p>
      <Link href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full">Contact Us</Link>
    </section>
  </main>
</div>

  );
}
