// pages/HealthInsurancePage.js

import { FaUserMd, FaHospitalAlt, FaMoneyBill, FaTooth, FaEye, FaBrain } from 'react-icons/fa';
import Link from "next/link";

const HealthInsurancePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Health Insurance</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <InsuranceCard
          icon={<FaUserMd className="w-10 h-10 text-blue-500" />}
          title="Medical Coverage"
          description="Get coverage for doctor visits, prescriptions, and medical procedures."
        />
        <InsuranceCard
          icon={<FaHospitalAlt className="w-10 h-10 text-green-500" />}
          title="Hospitalization"
          description="Cover the costs of hospital stays, surgeries, and other medical treatments."
        />
        <InsuranceCard
          icon={<FaMoneyBill className="w-10 h-10 text-yellow-500" />}
          title="Financial Protection"
          description="Protect yourself from high medical bills and unexpected healthcare expenses."
        />
        <InsuranceCard
          icon={<FaTooth className="w-10 h-10 text-purple-500" />}
          title="Dental Coverage"
          description="Receive coverage for dental check-ups, cleanings, and treatments."
        />
        <InsuranceCard
          icon={<FaEye className="w-10 h-10 text-pink-500" />}
          title="Vision Care"
          description="Cover the costs of eye exams, glasses, contact lenses, and vision correction surgeries."
        />
        <InsuranceCard
          icon={<FaBrain className="w-10 h-10 text-indigo-500" />}
          title="Mental Health Services"
          description="Access mental health counseling, therapy, and psychiatric treatments."
        />
      </div>
      <div className="max-w-3xl mt-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Why Health Insurance is Important?</h2>
        <p className="text-lg mb-4">
          Health insurance provides financial protection against medical expenses resulting from illness,
          injury, or other health-related issues. It ensures that you and your family can access necessary
          healthcare services without worrying about the high costs associated with medical treatments.
        </p>
        <h2 className="text-2xl font-bold mb-4">Types of Health Insurance Coverage</h2>
        <ul className="list-disc list-inside">
          <li className="mb-2">Medical Coverage: Covers doctor visits, prescriptions, and medical procedures.</li>
          <li className="mb-2">Hospitalization: Covers the costs of hospital stays, surgeries, and treatments.</li>
          <li className="mb-2">Dental and Vision: Covers dental care and vision-related expenses.</li>
          <li className="mb-2">Mental Health: Covers mental health services, therapy, and counseling.</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Choosing the Right Health Insurance Plan</h2>
        <p className="text-lg">
          When selecting a health insurance plan, consider factors such as coverage options, network of healthcare
          providers, premiums, deductibles, and out-of-pocket costs. Choose a plan that meets your healthcare needs
          and fits within your budget.
        </p>
      </div>
     
      <div className="max-w-3xl mt-12 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Health Insurance?</h2>
        <p className="text-lg mb-4">Explore our insurance plans and choose the one that best fits your needs.</p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300">
  <Link href="/prodcut/Health">
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

export default HealthInsurancePage;
