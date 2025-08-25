import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Index() {
    const router = useRouter();
    const [blog, setBlog] = useState({
        title: '',
        content: '',
    });
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setResponse(null);
        setError(null);
        setLoading(true);
        
        try {
            const authorId = localStorage.getItem('id'); // ดึง id มาจาก user storage
            
            const res = await axios.post('/api/addblog', { ...blog, authorId }); // เพิ่ม author id ไปด้วย
            setResponse(res.data.message);
            toast.success(res.data.message, {
                position: "top-center",
                onClose: () => {
                    router.push('/');
                }
            });
        } catch (error) {
            if (error.response) {
                setError({ message: error.response.data.message });
                toast.error(error.response.data.message, {
                    position: "top-center"
                });
            } else {
                setError({ message: 'An unexpected error occurred' });
                toast.error('An unexpected error occurred!', {
                    position: "top-center"
                });
            }
        } finally {
            setBlog({ title: '', content: '' });
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6'>
                <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-xl'>
                    <h2 className='text-2xl font-semibold mb-6 text-center'>Create a New Blog Post</h2>
                    <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={blog.title}
                            onChange={handleChange}
                            className='border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                        <textarea
                            name="content"
                            placeholder="Content"
                            value={blog.content}
                            onChange={handleChange}
                            className='border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                            rows={6}
                        />
                        <button
                            type="submit"
                            className='border bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-300'
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add Blog'}
                        </button>
                    </form>
                    {error && <div className='text-red-500 text-center mt-4'>{error.message}</div>}
                    {response && <div className='text-green-500 text-center mt-4'>{response}</div>}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Index;
