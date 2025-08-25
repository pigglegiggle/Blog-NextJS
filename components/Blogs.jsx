// components/Blogs.js
import React from 'react';
import Link from 'next/link';

function Blogs({ posts = [] }) {
    return (
        <>
            <div className='flex justify-center mt-6'>
                <Link href='/add-post' className='items-center'>
                    <button className='px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300'>
                        Add Post
                    </button>
                </Link>
            </div>
            <div className='flex flex-col items-center mt-10 pb-[5rem]'>
                <div className='w-full max-w-3xl space-y-6'>
                    {posts.map(blog => (
                        <div key={blog.id} className='bg-white shadow-lg border border-gray-200 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300'>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>{blog.title}</h2>
                            <p className='text-gray-700 mb-4'>{blog.content}</p>
                            <div className='flex justify-between items-center'>
                                <span className='text-sm text-gray-600'>By: {blog.author?.name || 'Unknown'}</span>
                                <span className='text-sm text-gray-500'>{new Date(blog.createdAt).toLocaleDateString(undefined, { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric', 
                                    hour: '2-digit', 
                                    minute: '2-digit', 
                                    hour12: true
                                })}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Blogs;
