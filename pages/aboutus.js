import React from "react";
import Head from 'next/head';
import Link from 'next/link';
const AboutUS =()=>{

    return<>
 <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>About Us - TechEject</title>
        <meta name="description" content="Learn more about TechEject - Your partner in health and life insurance solutions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-8">
        <section className="my-12">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">About <span className="text-indigo-700">TechEject</span></h1>
          <p className="text-lg text-center text-gray-700 mb-8">Learn more about TechEject - Your partner in health and life insurance solutions</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-center mb-2">Our Mission</h2>
              <p className="text-gray-700 text-center">At TechEject, our mission is to provide individuals and families with innovative and reliable insurance solutions that protect what matters most.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-center mb-2">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <img src="https://via.placeholder.com/150" alt="Team Member 1" className="w-24 h-24 mb-2 rounded-full" />
                  <h3 className="text-lg font-semibold mb-1">John Doe</h3>
                  <p className="text-gray-700 text-center">CEO</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="https://via.placeholder.com/150" alt="Team Member 2" className="w-24 h-24 mb-2 rounded-full" />
                  <h3 className="text-lg font-semibold mb-1">Jane Smith</h3>
                  <p className="text-gray-700 text-center">CFO</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="https://via.placeholder.com/150" alt="Team Member 3" className="w-24 h-24 mb-2 rounded-full" />
                  <h3 className="text-lg font-semibold mb-1">David Johnson</h3>
                  <p className="text-gray-700 text-center">Head of Customer Service</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-center mb-2">Our Values</h2>
              <ul className="text-gray-700 list-disc list-inside">
                <li className="mb-2"><span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md mr-2">Integrity</span> - We uphold the highest standards of integrity in all our interactions.</li>
                <li className="mb-2"><span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md mr-2">Excellence</span> - We strive for excellence in everything we do.</li>
                <li className="mb-2"><span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md mr-2">Customer-Centricity</span> - Our customers are at the heart of everything we do.</li>
                <li className="mb-2"><span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md mr-2">Innovation</span> - We embrace innovation to stay ahead of the curve.</li>
                <li><span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md mr-2">Teamwork</span> - We foster teamwork and collaboration to achieve our goals.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Our History</h2>
          <p className="text-gray-700 text-center">TechEject was founded in 2005 by a group of passionate insurance professionals with a vision to revolutionize the insurance industry. Since then, we have been dedicated to providing cutting-edge insurance solutions to individuals and businesses.</p>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Our Culture</h2>
          <p className="text-gray-700 text-center">At TechEject, we foster a culture of collaboration, innovation, and continuous learning. We believe in empowering our employees to reach their full potential and create a positive impact in the communities we serve.</p>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Community Involvement</h2>
          <p className="text-gray-700 text-center">We are committed to giving back to the community and supporting charitable organizations. Through volunteering initiatives and donations, we strive to make a difference in the lives of those in need.</p>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-8">Have questions or want to learn more? Reach out to us today.</p>
          <Link href="/contactus" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full">Contact Us</Link>
        </section>
      </main>

    </div>
   
  


    </>
}


export default AboutUS;