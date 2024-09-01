// pages/BusinessInsurancePage.js

import { FaBuilding, FaBriefcase, FaMoneyBill, FaShieldAlt, FaUserFriends } from 'react-icons/fa';
import Link from "next/link";

const BusinessInsurancePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Business Insurance</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <InsuranceCard
          icon={<FaBuilding className="w-10 h-10 text-blue-500" />}
          title="Property Insurance"
          description="Protects your business property, equipment, and inventory against damages or loss from fire, theft, or natural disasters."
        />
        <InsuranceCard
          icon={<FaBriefcase className="w-10 h-10 text-green-500" />}
          title="Liability Insurance"
          description="Provides coverage for bodily injury, property damage, and legal expenses resulting from lawsuits or claims against your business."
        />
        <InsuranceCard
          icon={<FaMoneyBill className="w-10 h-10 text-yellow-500" />}
          title="Business Interruption Insurance"
          description="Covers lost income and operating expenses if your business is forced to close temporarily due to a covered event."
        />
        <InsuranceCard
          icon={<FaShieldAlt className="w-10 h-10 text-red-500" />}
          title="Professional Liability Insurance"
          description="Protects your business against claims of negligence, errors, or omissions in the services or advice provided to clients."
        />
        <InsuranceCard
          icon={<FaUserFriends className="w-10 h-10 text-purple-500" />}
          title="Workers' Compensation Insurance"
          description="Covers medical expenses and lost wages for employees injured or disabled in the course of employment."
        />
      </div>
      <div className="max-w-3xl mt-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Why Business Insurance is Important?</h2>
        <p className="text-lg mb-4">
          Business insurance protects your company from financial losses due to unexpected events such as
          property damage, lawsuits, or employee injuries. It provides peace of mind and helps your business
          recover quickly from setbacks.
        </p>
        <h2 className="text-2xl font-bold mb-4">Types of Business Insurance Coverage</h2>
        <ul className="list-disc list-inside">
          <li className="mb-2">Property Insurance: Protects business property and assets.</li>
          <li className="mb-2">Liability Insurance: Provides coverage for lawsuits and claims.</li>
          <li className="mb-2">Business Interruption Insurance: Covers lost income due to business closures.</li>
          <li className="mb-2">Professional Liability Insurance: Protects against professional negligence.</li>
          <li className="mb-2">Workers Compensation Insurance: Covers employee injuries and disabilities.</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Choosing the Right Business Insurance Policy</h2>
        <p className="text-lg">
          Evaluate factors such as business size, industry, risks, coverage limits, and premiums when selecting
          a business insurance policy. Tailor your coverage to your specific business needs and consult with an
          insurance agent to ensure adequate protection.
        </p>
      </div>
      <div className="max-w-3xl mt-12 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Business Insurance?</h2>
        <p className="text-lg mb-4">Explore our insurance policies and safeguard your business against unforeseen risks.</p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300">
  <Link href="/prodcut/Business">
    Get Started
  </Link>
</button>
      </div>
    </div>
  );
};

const InsuranceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition duration-300">
      {icon}
      <h2 className="text-lg font-semibold mt-4 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default BusinessInsurancePage;
