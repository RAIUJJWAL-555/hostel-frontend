import React, { useState, useEffect, useRef } from 'react';
import Header from '../GeneralStudent/Header.jsx'; 
// API ke liye Base URL
const BASE_URL = `${import.meta.env.VITE_API_URL}/api`; 

// Input field ke liye component ko bahar define kiya gaya hai
const InputField = ({ name, type, placeholder, value, onChange, icon }) => (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </span>
      <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required className='w-full p-3 pl-10 bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300'/>
    </div>
);

const AdminRegistrationPage = () => {
  // Animation ke liye state
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Form data ke liye state
  const [formData, setFormData] = useState({
    adminId: '',
    name: '',
    email: '',
    role: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('register'); // 'register' | 'verify'
  const [message, setMessage] = useState('');
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [loading, setLoading] = useState(false);

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
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      setRegistrationEmail(formData.email);
      setStep('verify');
      setMessage(`✅ OTP sent to ${formData.email}. Please check your inbox.`);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/register/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registrationEmail, otp: otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'OTP verification failed');
      setFormData({ adminId: '', name: '', email: '', role: '', password: '' });
      setOtp('');
      setStep('register');
      setMessage('🎉 Registration complete! Admin account is now verified.');
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div 
        ref={sectionRef} 
        className="min-h-screen bg-cover bg-fixed bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="min-h-screen bg-[#1a202c]/80 p-4 sm:p-6 lg:p-8 pt-[120px] backdrop-blur-sm flex items-center justify-center">
          <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
            
            <div className={`w-full md:w-1/2 text-white transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Secure Admin Portal</h1>
              <p className="text-lg text-gray-300 mt-4">
                This portal is for authorized personnel only. Please register using your provided access key to manage the hostel facilities.
              </p>
              <div className="mt-8">
                {/* Image of secure admin portal */}
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600">
                  <svg className="w-full h-auto" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="100" rx="10" fill="url(#grad1)"/>
                    <path d="M50 40 L150 40 M50 60 L150 60" stroke="#4FD1C5" strokeWidth="2"/>
                    <circle cx="25" cy="50" r="10" fill="#4A5568"/>
                    <rect x="170" y="45" width="20" height="10" rx="3" fill="#4A5568"/>
                    <defs>
                      <linearGradient id="grad1" x1="0" y1="0" x2="200" y2="100">
                        <stop offset="0%" stopColor="#2D3748" />
                        <stop offset="100%" stopColor="#1A202C" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className="text-center mt-4 text-sm text-teal-400">End-to-End Encrypted Access</p>
                </div>
              </div>
            </div>

            <div className={`w-full md:w-1/2 transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className='w-full p-8 bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700'>
                {step === 'register' ? (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <h2 className="text-2xl font-bold text-center text-white mb-6">Create Admin Account</h2>
                    <InputField name="adminId" type="text" placeholder="Admin ID (Access Key)" value={formData.adminId} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7h1a2 2 0 012 2v5a2 2 0 01-2 2h-1m-6 0H6a2 2 0 01-2-2V9a2 2 0 012-2h1m6 0V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v0m6 0h-6" /></svg>} />
                    <InputField name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />
                    <InputField name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>} />
                    <InputField name="role" type="text" placeholder="Role in Administration" value={formData.role} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6" /></svg>} />
                    <InputField name="password" type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>} />
                    <button type='submit' className='w-full px-6 py-3 bg-teal-600 text-white font-bold rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300 transform hover:scale-105 disabled:opacity-50' disabled={loading}>
                      {loading ? 'Sending OTP...' : 'Register & Send OTP'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOTP} className="space-y-6">
                    <h2 className="text-2xl font-bold text-center text-white">Verify Your Account</h2>
                    <p className="text-center text-sm text-gray-300">An OTP was sent to {registrationEmail}. Enter the code below.</p>
                    <InputField name="otp" type="text" placeholder="Enter 6-Digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>} />
                    <button type="submit" className="w-full px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 transform hover:scale-105 disabled:opacity-50" disabled={loading || otp.length !== 6}>
                      {loading ? 'Verifying...' : 'Verify Account'}
                    </button>
                    <p className="text-center text-xs text-gray-400 cursor-pointer hover:underline" onClick={() => { setStep('register'); setMessage(''); }}>
                      Back to registration
                    </p>
                  </form>
                )}
                {message && (
                  <p className={`text-center mt-4 p-3 rounded-lg text-sm font-medium ${
                    message.startsWith('✅') || message.startsWith('🎉') ? 'bg-green-500/20 text-green-200 border border-green-400' : 
                    'bg-red-500/20 text-red-200 border border-red-400'
                  }`}>
                    {message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRegistrationPage;
