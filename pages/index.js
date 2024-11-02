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
        // เช็คว่ามี token ใน sessionStorage รึเปล่า
        const token = sessionStorage.getItem('token');
        setUserToken(token);
        if (!token) {
            // ตั้งข้อความผ่าน context ก่อน redirect ไปยังหน้าเข้าสู่ระบบ
            setMessage('กรุณา Login ก่อนเข้าหน้าหลัก');
            router.push('/auth/signin');
        } else {
            const sessionStoredName = sessionStorage.getItem('name');
            if (sessionStoredName) {
                setUsername(sessionStoredName);
            }

            // ดึง Posts มาหลังจากเรียก token สำเร็จ
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
            <Blogs posts={posts} /> {/* ส่ง posts ไปยัง blogs component ผ่าน props */}
        </div>
    );
}

export default Index;
