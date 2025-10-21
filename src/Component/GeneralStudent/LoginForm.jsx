import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../Student/Header';
// import Footer from './Footer';



// API ke liye Base URL
const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

// InputField component ko LoginPage se bahar define kiya gaya hai
const InputField = ({ name, type, placeholder, value, onChange, icon, required = true }) => (
  <div className="relative">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3">{icon}</span>
    <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required={required} className='w-full p-3 pl-10 bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300'/>
  </div>
);

const LoginPage = () => {
  const navigate = useNavigate();
  // Animation ke liye state
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Form data ke liye state
  const [formData, setFormData] = useState({
    studentIdentifier: '',
    adminIdentifier: '', 
    password: '',        
    userType: 'student', 
  });
  const [adminLoginMethod, setAdminLoginMethod] = useState('password');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpValue, setOtpValue] = useState(''); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Mock components
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdminMethodChange = (e) => {
    setAdminLoginMethod(e.target.value);
    setOtpSent(false);
    setFormData((prev) => ({ ...prev, password: '' }));
    setOtpValue('');
  };
  
  const handleSendOTP = async (email) => {
    if (!email) {
        toast.warn('Please enter your admin email first.', { position: 'top-center' });
        return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/login/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send OTP!');
      toast.info('OTP has been sent to your email.', { position: 'top-center' });
      setOtpSent(true);
      setOtpValue('');
    } catch (err) {
      toast.error(`OTP Error: ${err.message}`, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let loginPath = '';
    let payload = {};

    if (formData.userType === 'student') {
      loginPath = '/student/login'; 
      payload = { applicationNumber: formData.studentIdentifier, password: formData.password };
    } else if (formData.userType === 'admin') {
      const adminEmail = formData.adminIdentifier;
      if (adminLoginMethod === 'otp' && !otpSent) {
          await handleSendOTP(adminEmail);
          setLoading(false);
          return; 
      }
      if (adminLoginMethod === 'password') {
        loginPath = '/admin/login'; 
        payload = { email: adminEmail, password: formData.password };
      } else if (adminLoginMethod === 'otp' && otpSent) {
        loginPath = '/admin/login/verify-otp-login';
        payload = { email: adminEmail, otp: otpValue }; 
      }
    }

    try {
      if (!loginPath) {
        setLoading(false);
        return; 
      }
      const res = await fetch(`${BASE_URL}${loginPath}`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed!');

      if (formData.userType === 'admin') {
        localStorage.setItem('adminData', JSON.stringify(data.admin));
        toast.success('Admin login successful!', { position: 'top-center', autoClose: 1500, onClose: () => navigate('/admin/dashboard') });
      } else {
        localStorage.setItem('studentData', JSON.stringify(data.student));
        toast.success('Student login successful!', { position: 'top-center', autoClose: 1500, onClose: () => navigate('/student/dashboard') });
      }
    } catch (err) {
      toast.error(`Login failed: ${err.message}`, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer theme="dark" />
      <div 
        ref={sectionRef} 
        className="min-h-screen bg-cover bg-fixed bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554474052-a273b47f07c6?q=80&w=1974&auto=format&fit=crop')" }}
      >
        <div className="min-h-screen bg-[#1a202c]/80 p-4 sm:p-6 lg:p-8 pt-[90px] backdrop-blur-sm flex items-center justify-center">
          <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
            
            <div className={`w-full md:w-1/2 text-white transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Access Your Portal</h1>
              <p className="text-lg text-gray-300 mt-4">
                Welcome back! Please log in to access your dashboard, view announcements, and manage your profile.
              </p>
              <div className="mt-8">
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600">
                  <img src="https://placehold.co/600x400/1A202C/4FD1C5?text=Secure+Login" alt="Secure login illustration" className="rounded-lg"/>
                  <p className="text-center mt-4 text-sm text-teal-400">Your connection is secure and encrypted.</p>
                </div>
              </div>
            </div>

            <div className={`w-full md:w-1/2 transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className='w-full p-6 bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700'>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-2xl font-bold text-center text-white mb-4">Hostel Login</h2>
                    
                    <select name="userType" value={formData.userType} onChange={(e) => { handleChange(e); setAdminLoginMethod('password'); setOtpSent(false); }} className="w-full p-3 bg-gray-800/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400">
                      <option value="student">Student Login</option>
                      <option value="admin">Admin Login</option>
                    </select>

                    {formData.userType === 'student' && (
                        <InputField name="studentIdentifier" type="text" placeholder="Application Number" value={formData.studentIdentifier} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6" /></svg>} />
                    )}

                    {formData.userType === 'admin' && (
                      <>
                        <InputField name="adminIdentifier" type="email" placeholder="Admin Email" value={formData.adminIdentifier} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>} />
                        <div className="flex justify-around items-center bg-gray-800/50 p-2 rounded-lg text-white">
                            <label className="flex items-center space-x-2 cursor-pointer"><input type="radio" value="password" checked={adminLoginMethod === 'password'} onChange={handleAdminMethodChange} className="form-radio text-teal-500 bg-gray-700 border-gray-600"/><span>Password</span></label>
                            <label className="flex items-center space-x-2 cursor-pointer"><input type="radio" value="otp" checked={adminLoginMethod === 'otp'} onChange={handleAdminMethodChange} className="form-radio text-teal-500 bg-gray-700 border-gray-600"/><span>OTP</span></label>
                        </div>
                      </>
                    )}

                    {(formData.userType === 'student' || (formData.userType === 'admin' && adminLoginMethod === 'password')) && (
                      <InputField name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>} />
                    )}
                    
                    {formData.userType === 'admin' && adminLoginMethod === 'otp' && otpSent && (
                      <InputField name="otpValue" type="text" placeholder="Enter 6-Digit OTP" value={otpValue} onChange={(e) => setOtpValue(e.target.value)} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>} />
                    )}

                    <button type="submit" className='w-full px-6 py-3 mt-2 bg-teal-600 text-white font-bold rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300 transform hover:scale-105 disabled:opacity-50' disabled={loading || (formData.userType === 'admin' && adminLoginMethod === 'otp' && otpSent && otpValue.length !== 6)}>
                      {loading ? 'Loading...' : (formData.userType === 'admin' && adminLoginMethod === 'otp' && !otpSent) ? 'Send OTP' : 'Login'}
                    </button>
                    
                    {formData.userType === 'admin' && adminLoginMethod === 'otp' && otpSent && (
                        <button type="button" onClick={() => { setOtpSent(false); setOtpValue(''); }} className="w-full text-sm text-center text-red-400 py-2 rounded-lg hover:text-red-300 transition duration-200">
                            Cancel / Change Email
                        </button>
                    )}
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default LoginPage;

