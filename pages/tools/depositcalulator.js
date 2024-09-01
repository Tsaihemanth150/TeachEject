// pages/index.js
import { useState } from 'react';

const DepositCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [interestType, setInterestType] = useState('simple');
  const [currency, setCurrency] = useState('INR');
  const [finalAmount, setFinalAmount] = useState(null);

  const calculateFinalAmount = () => {
    const principal = parseFloat(initialDeposit);
    const rate = parseFloat(interestRate) / 100;
    const time = parseFloat(timePeriod);

    let finalAmount;
    if (interestType === 'simple') {
      finalAmount = principal * (1 + rate * time);
    } else {
      finalAmount = principal * Math.pow(1 + rate, time);
    }
    setFinalAmount(finalAmount.toFixed(2));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Deposit Calculator</h2>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="initialDeposit">
          Initial Deposit ({currency})
        </label>
        <input
          className="w-full border rounded px-3 py-2"
          type="number"
          id="initialDeposit"
          value={initialDeposit}
          onChange={(e) => setInitialDeposit(e.target.value)}
          placeholder="Enter initial deposit"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="interestRate">
          Annual Interest Rate (%)
        </label>
        <input
          className="w-full border rounded px-3 py-2"
          type="number"
          id="interestRate"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="Enter interest rate"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="timePeriod">
          Time Period (years)
        </label>
        <input
          className="w-full border rounded px-3 py-2"
          type="number"
          id="timePeriod"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          placeholder="Enter time period"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="interestType">
          Interest Type
        </label>
        <select
          className="w-full border rounded px-3 py-2"
          id="interestType"
          value={interestType}
          onChange={(e) => setInterestType(e.target.value)}
        >
          <option value="simple">Simple Interest</option>
          <option value="compound">Compound Interest</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="currency">
          Currency
        </label>
        <select
          className="w-full border rounded px-3 py-2"
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="INR">Indian Rupees (INR)</option>
          <option value="USD">US Dollar (USD)</option>
          <option value="EUR">Euro (EUR)</option>
        </select>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={calculateFinalAmount}
      >
        Calculate
      </button>
      {finalAmount !== null && (
        <p className="mt-4">
          After {timePeriod} years, your final amount will be {currency}{' '}
          {finalAmount}.
        </p>
      )}
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <DepositCalculator />
    </div>
  );
};

export default Home;
