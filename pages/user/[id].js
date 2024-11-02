import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

function UserDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchUsers() {
        try {
          const res = await fetch(`/api/getuser/${id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch user');
          }
          const data = await res.json();
          setUser(data.user);
        } catch (error) {
          console.log('Error fetching user:', error);
        }
      }
      fetchUsers();
    }
  }, [id]);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <Navbar />
      <div className='flex flex-col items-center justify-center p-6'>
        <h1 className='text-3xl font-semibold mb-6'>User Detail</h1>
        {user ? (
          <div className='bg-white shadow-md rounded-lg p-6 w-full max-w-md'>
            <p className='text-lg font-bold mb-2'>Name:</p>
            <p className='text-gray-700 mb-4'>{user.name}</p>
            <p className='text-lg font-bold mb-2'>Email:</p>
            <p className='text-gray-700 mb-4'>{user.email}</p>
            <p className='text-lg font-bold mb-2'>Created At:</p>
            <p className='text-gray-700'>{new Date(user.createdAt).toLocaleString()}</p>
          </div>
        ) : (
          <p className='text-red-500'>User not found</p>
        )}
      </div>
    </div>
  );
}

export default UserDetail;
