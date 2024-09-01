// pages/index.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '@/components/sidebar';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/admin/contacts');
        setContacts(response.data.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }

    fetchData();
  }, []);

  const handleResolve = async (id) => {
    try {
      // Perform the action to resolve the contact using the id
      // For example, you can make a DELETE request to the server
      await axios.post('/api/admin/updateContact', { _id: id });
    } catch (error) {
      console.error('Error resolving contact:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
     
      <h1 className="text-xl mx-5 font-bold mb-4">Contact List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact._id} className="border-b border-gray-400">
                <td className="px-4 py-2">{contact.name}</td>
                <td className="px-4 py-2">{contact.email}</td>
                <td className="px-4 py-2 max-w-xs overflow-hidden">{contact.desc}</td>
                <td className="px-4 py-2">{new Date(contact.date).toLocaleString()}</td>
                <td className="px-4 py-2">
                  {contact.isResolved ? (
                    <span className="text-green-500">Resolved</span>
                  ) : (
                    <button onClick={() => handleResolve(contact._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
