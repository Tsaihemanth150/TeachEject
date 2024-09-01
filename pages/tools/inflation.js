import { useState } from 'react';

export default function InflationCalculator() {
  const [currentPrice, setCurrentPrice] = useState('');
  const [years, setYears] = useState('');
  const [inflationRate, setInflationRate] = useState('');
  const [adjustedPrice, setAdjustedPrice] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const calculateAdjustedPrice = () => {
    const price = parseFloat(currentPrice);
    const yearCount = parseInt(years, 10);
    const rate = parseFloat(inflationRate);

    if (isNaN(price) || isNaN(yearCount) || isNaN(rate) || price <= 0 || yearCount <= 0 || rate <= 0) {
      alert('Please enter valid positive numbers for all fields.');
      return;
    }

    let adjustedPrice = price * Math.pow(1 + rate / 100, yearCount);
    
    // Currency conversion
    const conversionRates = {
      EUR: 0.85,
      GBP: 0.75,
      INR: 75,
      JPY: 110,
      AUD: 1.3,
      CAD: 1.2,
      // Add more currencies and rates as needed
    };

    if (selectedCurrency in conversionRates) {
      adjustedPrice *= conversionRates[selectedCurrency];
    }

    setAdjustedPrice(adjustedPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inflation Calculator</h1>
      <div className="mb-4">
        <label className="block mb-2">
          Currency:
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
            <option value="JPY">JPY</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
            {/* Add more currencies as needed */}
          </select>
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Current Price:
          <input
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Years:
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Inflation Rate (% per year):
          <input
            type="number"
            value={inflationRate}
            onChange={(e) => setInflationRate(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
      </div>
      <button
        onClick={calculateAdjustedPrice}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Calculate Adjusted Price
      </button>
      {adjustedPrice && (
        <p className="mt-4">
          Adjusted Price after {years} years: {adjustedPrice} {selectedCurrency}
        </p>
      )}
    </div>
  );
}
