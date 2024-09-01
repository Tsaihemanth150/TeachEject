import React from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Link from 'next/link';
import Sidebar from '@/components/sidebar';

const AdminProduct = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex">
      <Sidebar />
      <div className="ml-64"> {/* Adjust the margin left to accommodate the sidebar width */}
        <h1 className="text-2xl font-bold mb-4">Product Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card for Add Product */}
          <Link href="/addProduct" legacyBehavior>
            <p className="border border-gray-200 rounded p-4 flex flex-col items-center justify-center bg-white hover:bg-gray-100 transition">
              <FaPlus className="text-4xl mb-2" />
              <p>Add Product</p>
            </p>
          </Link>

          {/* Card for Update/Delete Product */}
          <Link href="/viewanordeleteprodcut" legacyBehavior>
            <p className="border border-gray-200 rounded p-4 flex flex-col items-center justify-center bg-white hover:bg-gray-100 transition">
              <div className="flex items-center">
                <FaEdit className="text-2xl mx-2 mb-2" />
                <FaTrash className="text-2xl mx-2 mb-2" />
              </div>
              <span className="text-lg">Update/Delete</span>
            </p>
          </Link>

          {/* Card for View Products */}
          <Link href="/products" legacyBehavior>
            <p className="border border-gray-200 rounded p-4 flex flex-col items-center justify-center bg-white hover:bg-gray-100 transition">
              <FaEye className="text-4xl mb-2" />
              <p>View Products</p>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
