// pages/AutoInsurancePage.js

import { FaCar, FaCarCrash, FaMoneyBill, FaUserFriends, FaHandHoldingUsd } from 'react-icons/fa';
import Link from "next/link";

const AutoInsurancePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Auto Insurance</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <InsuranceCard
          icon={<FaCar className="w-10 h-10 text-blue-500" />}
          title="Vehicle Coverage"
          description="Protect your vehicle against damages from accidents, theft, or vandalism."
        />
        <InsuranceCard
          icon={<FaCarCrash className="w-10 h-10 text-red-500" />}
          title="Collision Coverage"
          description="Covers damages to your vehicle resulting from collisions with other vehicles or objects."
        />
        <InsuranceCard
          icon={<FaMoneyBill className="w-10 h-10 text-yellow-500" />}
          title="Liability Insurance"
          description="Provides coverage for bodily injury and property damage liability in accidents."
        />
        <InsuranceCard
          icon={<FaUserFriends className="w-10 h-10 text-green-500" />}
          title="Uninsured/Underinsured Motorist Coverage"
          description="Protects you in case of accidents with drivers who have insufficient or no insurance."
        />
        <InsuranceCard
          icon={<FaHandHoldingUsd className="w-10 h-10 text-purple-500" />}
          title="Medical Payments Coverage"
          description="Covers medical expenses for you and your passengers in case of injuries from accidents."
        />
      </div>
      <div className="max-w-3xl mt-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Why Auto Insurance is Important?</h2>
        <p className="text-lg mb-4">
          Auto insurance provides financial protection against damages or injuries resulting from accidents
          involving your vehicle. It is mandatory in most states and helps cover medical expenses, vehicle
          repairs, and liability costs in case of accidents.
        </p>
        <h2 className="text-2xl font-bold mb-4">Types of Auto Insurance Coverage</h2>
        <ul className="list-disc list-inside">
          <li className="mb-2">Vehicle Coverage: Protects your vehicle against damages and theft.</li>
          <li className="mb-2">Collision Coverage: Covers damages resulting from collisions.</li>
          <li className="mb-2">Liability Insurance: Provides coverage for bodily injury and property damage liability.</li>
          <li className="mb-2">Uninsured/Underinsured Motorist Coverage: Protects against uninsured or underinsured drivers.</li>
          <li className="mb-2">Medical Payments Coverage: Covers medical expenses for you and your passengers.</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Choosing the Right Auto Insurance Policy</h2>
        <p className="text-lg">
          Evaluate factors such as coverage limits, deductibles, premiums, and additional coverages
          when selecting an auto insurance policy. Consider your driving habits, vehicle value, and
          budget to find the best coverage for your needs.
        </p>
      </div>
      <div className="max-w-3xl mt-12 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Auto Insurance?</h2>
        <p className="text-lg mb-4">Explore our insurance policies and protect yourself on the road.</p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300">
  <Link href="/prodcut/Auto">
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

export default AutoInsurancePage;
