// pages/LifeInsurancePage.js

import { FaHeartbeat, FaHandsHelping, FaMoneyBill, FaUserFriends, FaHandHoldingHeart } from 'react-icons/fa';
import Link from "next/link";

const LifeInsurancePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Life Insurance</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <InsuranceCard
          icon={<FaHeartbeat className="w-10 h-10 text-red-500" />}
          title="Financial Security"
          description="Ensure financial security for your loved ones in case of your untimely death."
        />
        <InsuranceCard
          icon={<FaHandsHelping className="w-10 h-10 text-green-500" />}
          title="Support for Dependents"
          description="Provide support to your dependents, including spouse, children, or parents."
        />
        <InsuranceCard
          icon={<FaMoneyBill className="w-10 h-10 text-yellow-500" />}
          title="Debt Repayment"
          description="Cover outstanding debts such as mortgage, loans, or credit cards."
        />
        <InsuranceCard
          icon={<FaUserFriends className="w-10 h-10 text-blue-500" />}
          title="Income Replacement"
          description="Replace lost income to maintain the standard of living for your family."
        />
        <InsuranceCard
          icon={<FaHandHoldingHeart className="w-10 h-10 text-pink-500" />}
          title="Funeral Expenses"
          description="Cover funeral and burial expenses to alleviate financial burden on your family."
        />
      </div>
      <div className="max-w-3xl mt-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Why Life Insurance is Important?</h2>
        <p className="text-lg mb-4">
          Life insurance provides financial protection and peace of mind to you and your loved ones.
          It ensures that your family is taken care of financially in the event of your death,
          helping them cover expenses and maintain their quality of life.
        </p>
        <h2 className="text-2xl font-bold mb-4">Types of Life Insurance Coverage</h2>
        <ul className="list-disc list-inside">
          <li className="mb-2">Term Life Insurance: Provides coverage for a specific period, usually 10, 20, or 30 years.</li>
          <li className="mb-2">Whole Life Insurance: Offers coverage for your entire life and includes a cash value component.</li>
          <li className="mb-2">Universal Life Insurance: Flexible policy with adjustable premiums and death benefits.</li>
          <li className="mb-2">Variable Life Insurance: Allows you to invest in sub-accounts within the policy.</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Choosing the Right Life Insurance Policy</h2>
        <p className="text-lg">
          When selecting a life insurance policy, consider factors such as coverage amount, premium costs,
          policy duration, and riders such as critical illness or disability coverage. Evaluate your
          financial needs and consult with a financial advisor to find the best policy for your situation.
        </p>
      </div>
      <div className="max-w-3xl mt-12 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Life Insurance?</h2>
        <p className="text-lg mb-4">Explore our insurance policies and secure the financial future of your loved ones.</p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300">
  <Link href="/prodcut/Life">
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

export default LifeInsurancePage;
