import { useState, useEffect } from 'react';
import axios from 'axios';
import { Router } from 'lucide-react';
import { useRouter } from 'next/router';

const AdminClaimsPage = () => {
  const router = useRouter(); 
  const [claims, setClaims] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get('/api/admin/adminClaims');
        setUsers(response.data.users);
        setClaims(response.data.data);
        setFilteredClaims(response.data.data);
      } catch (error) {
        console.error('Error fetching claims:', error);
      }
    };

    fetchClaims();
  }, []);

  const handleSearch = () => {
    const filtered = claims.filter(claim =>
      claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClaims(filtered);
  };

  const handleClick = async (user,insuranceProducts,ClaimId) => {
    const data = { user };
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/claimdeatils`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    localStorage.setItem('TempUserId', user);
    localStorage.setItem('TempInsuranceId', insuranceProducts);
    localStorage.setItem('TempClaimId',ClaimId);
  
    router.push('/adminviewclaims');
  };
  
  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        className="border border-gray-300 rounded-md p-2 mb-4"
        placeholder="Search by user..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleSearch}
      >
        Search
      </button>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Claim Number</th>
            <th className="px-4 py-2">Claim Date</th>
            <th className="px-4 py-2">Claim Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredClaims.map(claim => (
            <tr key={claim._id}>
              <td className="border px-4 py-2">{claim.user}</td>
              <td className="border px-4 py-2">{claim.claimNumber}</td>
              <td className="border px-4 py-2">{claim.claimDate}</td>
              <td className="border px-4 py-2">{claim.claimStatus}</td>
              <button className='border py-2 bg-blue-400 px-4 rounded-md' onClick={() => handleClick(claim.user,claim.insuranceProducts,claim._id)}>View</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminClaimsPage;
