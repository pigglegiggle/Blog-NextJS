import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import Navbar from './components/Navbar';
import Blogs from './components/Blogs';
import axios from 'axios';

function Index() {
    const router = useRouter();
    const { setMessage } = useUser();
    const [posts, setPosts] = useState([]);
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setUserToken(token);
        if (!token) {
            setMessage('Please log in before going to the homepage.');
            router.push('/auth/signin');
        } else {
            fetchPosts();
        }
    }, [router, setMessage, userToken]);

    const fetchPosts = async () => {
        try {
            const res = await axios.get('/api/getallblogs');
            setPosts(res.data.posts || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <Blogs posts={posts || []} /> {/* Always pass an array */}
        </div>
    );
}

export default Index;
