import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

function Navbar() {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const { setMessage } = useUser();
    const router = useRouter();

    useEffect(() => {
        // ดึง token ต่างๆจาก localStorage ของ client
        const storedId = localStorage.getItem('id');
        const storedToken = localStorage.getItem('token');

        if (storedId) {
            setUserId(storedId);
        }

        setToken(storedToken);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        setMessage('You have been logged out');
        router.push('/auth/signin');
    };

    return (
        <div className='shadow-lg h-14 flex justify-center items-center'>
            <div className='max-w-7xl w-full flex justify-between items-center p-5'>
                <Link href='/'>
                    <h1 className='text-xl'>NextJS Blog</h1>
                </Link>
                <ul className='flex items-center space-x-10'>
                    <li className='cursor-pointer transition-transform duration-300 hover:scale-105 flex items-center'>
                        <Link href='/'>
                            <span>🏠Home</span>
                        </Link>
                    </li>
                    <li className='cursor-pointer transition-transform duration-300 hover:scale-105 flex items-center'>
                        <Link href={userId ? `/user/${userId}` : '#'}>
                            <span>😎Profile</span>
                        </Link>
                    </li>
                    {token ? (
                        <li className='flex items-center'>
                            <button 
                                onClick={handleLogout}
                                className='bg-red-500 text-white px-4 py-2 rounded transition-transform duration-300 hover:bg-red-600'
                            >
                                Logout
                            </button>
                        </li>
                    ) : null}
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
