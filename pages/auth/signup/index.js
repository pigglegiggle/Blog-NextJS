import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify
function SignUp() {
    // สร้างตัวแปรต่างๆ สำหรับการสมัครสมาชิก
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        repassword: ''
    });
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        // เปลี่ยน name : value ให้ตรงกับ form ทันทีที่มีการเปลี่ยนแปลงโดยรับค่า event มา
        const { name, value } = e.target;
        // ใช้ ...prev เพื่อให้ข้อมูลอันเก่าใน input ที่ไม่มีการเปลี่ยนแปลงอยู่เหมือนเดิม
        setFormData((prev) => ({
            ...prev,
            [name] : value
        }));
    };

    const handleSubmit = async (e) => {
        // กัน Refresh หน้าเว็บหลังกด Submit
        e.preventDefault();

        // Set reponse เป็น null
        setResponse(null);
        // Set error เป็น null
        setError(null);
        // Set loading เป็น true ทันทีที่กด submit
        setLoading(true);
        try {
            // ส่ง post request ไปที่ /api/register พร้อมกับ Object ของ Form
            const res = await axios.post('/api/register', formData);
            // หลังจากส่ง request สำเร็จก็ตั้ง message และ success ตาม response ของ Back-end
            setResponse({ message: res.data.message, success: res.data.success });
            toast.success(res.data.message, {
                position: "top-center"
            }); // โชว์ success toast

        } catch (error) {
            // เช็คว่า มี Error จาก reponse ที่ ส่ง request ไปรึป่าว
            if (error.response) {
                // ตั้ง message ของ error จาก reponse api
                setError({
                    // error.response.data คือ built-in function ของ axios
                    message: error.response.data.message,
                });
                toast.error(error.response.data.message, {
                    position: "top-center"
                }); // โชว์ error toast
            } else {
                // Network Error
                setError({ message: 'An unexpected error occurred'});
                toast.error('An unexpected error occurred!', {
                    position: "top-center"
                }); // โชว์ network error toast
            }
        } finally {
            // ลบข้อมูลใน input หลังกด Submit
            setFormData({ name: '', email: '', password: '', repassword: '' });
            // ลบสถานะ Loading
            setLoading(false);
        }
    }
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className="signup-container text-center">
                <form onSubmit={handleSubmit} className="signup-form flex flex-col gap-y-5">
                    <h2 className='text-xl font-semibold'>Sign Up</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className='border p-2'
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className='border p-2'
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className='border p-2'
                    />
                    <input
                        type="password"
                        name="repassword"
                        placeholder="Re-enter Password"
                        value={formData.repassword}
                        onChange={handleChange}
                        className='border p-2'
                    />
                    <button
                     type="submit"
                     className='border bg-blue-500 text-white p-3'
                    >
                        Sign Up
                    </button>
                    <a href='/auth/signin' className='hover:underline text-blue-500'>Already have an account? Click here to Sign In</a>
                </form>
            </div>
            <ToastContainer />
        </div>

  )
}

export default SignUp