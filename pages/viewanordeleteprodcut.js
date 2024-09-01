// productsPage.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import Router from 'next/router';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/prodcuts/getProdcuts');
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred while fetching products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleUpdate = async (productId) => {
    try {
      localStorage.setItem('productId', productId);
      Router.push(`/updateProdcut`)
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete('/api/prodcuts/deleteProdcut', { data: { id } });
    
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  
  


  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Product Details</h1>
      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left bg-gray-100 border-b">Name</th>
                <th className="px-4 py-2 text-left bg-gray-100 border-b">Type</th>
              
                <th className="px-4 py-2 text-left bg-gray-100 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="border-b">
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.type}</td>
                 
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleUpdate(product._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                    >
                      <FaEdit />
                    </button>
                  
                            <AlertDialog>
              <AlertDialogTrigger asChild>
             <Button variant="outline">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete ?</AlertDialogTitle>
                  <AlertDialogDescription>
                   this action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(product._id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
           
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
