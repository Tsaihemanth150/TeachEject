// pages/PropertyInsurancePage.js

import { FaHome, FaCar, FaBuilding, FaFire, FaMoneyBill } from 'react-icons/fa';
import Link from "next/link";

const PropertyInsurancePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Property Insurance</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <InsuranceCard
          icon={<FaHome className="w-10 h-10 text-blue-500" />}
          title="Home Insurance"
          description="Protect your home and personal belongings against damages from fire, theft, or natural disasters."
        />
        <InsuranceCard
          icon={<FaCar className="w-10 h-10 text-green-500" />}
          title="Auto Insurance"
          description="Cover damages to your vehicle and liability in case of accidents, theft, or vandalism."
        />
        <InsuranceCard
          icon={<FaBuilding className="w-10 h-10 text-yellow-500" />}
          title="Commercial Property Insurance"
          description="Protect your business property, equipment, and inventory from damages or loss."
        />
        <InsuranceCard
          icon={<FaFire className="w-10 h-10 text-red-500" />}
          title="Fire Insurance"
          description="Specifically covers damages caused by fire, including structural damage and loss of belongings."
        />
        <InsuranceCard
          icon={<FaMoneyBill className="w-10 h-10 text-purple-500" />}
          title="Rental Property Insurance"
          description="Insurance for landlords to protect rental properties against damages and liability risks."
        />
      </div>
      <div className="max-w-3xl mt-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Why Property Insurance is Important?</h2>
        <p className="text-lg mb-4">
          Property insurance provides financial protection against damages or loss to your property
          and assets. It ensures that you can recover from unexpected events such as fires, thefts,
          natural disasters, or accidents without suffering significant financial losses.
        </p>
        <h2 className="text-2xl font-bold mb-4">Types of Property Insurance Coverage</h2>
        <ul className="list-disc list-inside">
          <li className="mb-2">Homeowners Insurance: Protects your home, personal belongings, and liability.</li>
          <li className="mb-2">Auto Insurance: Covers damages to your vehicle and liability in accidents.</li>
          <li className="mb-2">Commercial Property Insurance: Protects business properties and assets.</li>
          <li className="mb-2">Fire Insurance: Specifically covers damages caused by fire.</li>
          <li className="mb-2">Rental Property Insurance: Insurance for landlords to protect rental properties.</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Choosing the Right Property Insurance Policy</h2>
        <p className="text-lg">
          Consider factors such as coverage limits, deductibles, premiums, exclusions, and additional
          coverages when selecting a property insurance policy. Assess your propertys value, risks,
          and your budget to find the best coverage for your needs.
        </p>
      </div>
      <div className="max-w-3xl mt-12 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Property Insurance?</h2>
        <p className="text-lg mb-4">Explore our insurance policies and protect your property against unexpected risks.</p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300">
  <Link href="/prodcut/Property">
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

export default PropertyInsurancePage;
