// pages/TravelInsurancePage.js

import { FaPlane, FaHospital, FaSuitcase, FaMoneyBill, FaMapMarkedAlt } from 'react-icons/fa';
import Link from "next/link";

const TravelInsurancePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Travel Insurance</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <InsuranceCard
          icon={<FaPlane className="w-10 h-10 text-blue-500" />}
          title="Trip Cancellation Coverage"
          description="Get reimbursed for prepaid, non-refundable trip expenses if you need to cancel or interrupt your trip due to covered reasons."
        />
        <InsuranceCard
          icon={<FaHospital className="w-10 h-10 text-red-500" />}
          title="Emergency Medical Coverage"
          description="Covers medical expenses incurred due to accidents or illnesses while traveling, including hospital stays, doctor visits, and prescriptions."
        />
        <InsuranceCard
          icon={<FaSuitcase className="w-10 h-10 text-yellow-500" />}
          title="Baggage Loss or Delay"
          description="Provides coverage for lost, stolen, or damaged baggage, as well as reimbursement for essentials in case of baggage delay."
        />
        <InsuranceCard
          icon={<FaMoneyBill className="w-10 h-10 text-green-500" />}
          title="Travel Financial Protection"
          description="Protects your travel investment by reimbursing prepaid, non-refundable trip expenses if your trip is cancelled, interrupted, or delayed for covered reasons."
        />
        <InsuranceCard
          icon={<FaMapMarkedAlt className="w-10 h-10 text-purple-500" />}
          title="Travel Assistance Services"
          description="Offers assistance services such as emergency medical evacuation, 24/7 travel assistance, and concierge services."
        />
      </div>
      <div className="max-w-3xl mt-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Why Travel Insurance is Important?</h2>
        <p className="text-lg mb-4">
          Travel insurance provides financial protection and assistance services when unexpected events occur
          during your trip. It covers various risks such as trip cancellations, medical emergencies, baggage loss,
          and provides peace of mind while traveling.
        </p>
        <h2 className="text-2xl font-bold mb-4">Types of Travel Insurance Coverage</h2>
        <ul className="list-disc list-inside">
          <li className="mb-2">Trip Cancellation Coverage: Reimburses prepaid, non-refundable trip expenses.</li>
          <li className="mb-2">Emergency Medical Coverage: Covers medical expenses while traveling.</li>
          <li className="mb-2">Baggage Loss or Delay: Provides coverage for lost or delayed baggage.</li>
          <li className="mb-2">Travel Financial Protection: Protects your travel investment.</li>
          <li className="mb-2">Travel Assistance Services: Offers emergency assistance services.</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Choosing the Right Travel Insurance Policy</h2>
        <p className="text-lg">
          Consider factors such as trip duration, destination, coverage limits, deductibles, and exclusions
          when selecting a travel insurance policy. Choose a policy that provides adequate coverage for your
          travel needs and offers assistance services in case of emergencies.
        </p>
      </div>
      <div className="max-w-3xl mt-12 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Travel Insurance?</h2>
        <p className="text-lg mb-4">Explore our insurance policies and enjoy worry-free travel experiences.</p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300">
  <Link href="/prodcut/Travel">
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

export default TravelInsurancePage;
