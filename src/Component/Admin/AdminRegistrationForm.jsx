import React, { useState, useEffect, useRef } from 'react';
import Header from '../GeneralStudent/Header.jsx'; 
// API ke liye Base URL
const BASE_URL = `${import.meta.env.VITE_API_URL}/api`; 

// Input field ke liye component
const InputField = ({ name, type, placeholder, value, onChange, icon, error }) => (
    <div className="relative group">
      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors duration-300">
        {icon}
      </span>
      <input 
        type={type} 
        name={name} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        className={`w-full py-3.5 pl-12 pr-4 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900/70 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 border rounded-xl shadow-inner focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm ${error ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
      />
      {error && <p className="text-red-500 dark:text-red-400 text-xs mt-1.5 ml-2 font-medium flex items-center gap-1"><span className="inline-block w-1 h-1 rounded-full bg-red-500 dark:bg-red-400"></span>{error}</p>}
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
  const [errors, setErrors] = useState({});

  // --- LOGIC SAME AS BEFORE ---
  const validateForm = () => {
    let newErrors = {};
    if (!formData.adminId.trim()) newErrors.adminId = "Admin ID is required";
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.role.trim()) newErrors.role = "Role is required";
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    // Clear error on change
    if (errors[e.target.name]) {
        setErrors({...errors, [e.target.name]: null});
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setMessage('');
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, adminId: formData.adminId.trim() }),
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
        className="min-h-screen mt-16 bg-gradient-to-br from-slate-50 via-gray-100 to-indigo-50 dark:from-slate-950 dark:via-gray-900 dark:to-indigo-950 transition-colors duration-300" 
      >
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 pt-[130px] flex items-center justify-center">
          <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            
            {/* Left Side Text Content */}
            <div className={`w-full md:w-1/2 text-slate-900 dark:text-white transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="mb-6 inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-full text-indigo-700 dark:text-indigo-300 text-xs font-bold tracking-widest uppercase transition-colors">
                Secure Access
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 transition-colors">
                Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Portal</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg transition-colors">
                Authorized personnel only. Register here to gain secure access to the hostel management system.
              </p>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm transition-colors shadow-lg dark:shadow-none">
                  <div className="grid grid-cols-2 gap-6">
                      <div>
                          <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1 transition-colors">100%</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium transition-colors">Secure</p>
                      </div>
                      <div>
                          <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1 transition-colors">24/7</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium transition-colors">Availability</p>
                      </div>
                      <div className="col-span-2 pt-4 border-t border-slate-200 dark:border-slate-700/50 mt-2 transition-colors">
                        <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 text-sm font-medium transition-colors">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span>System Operational</span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Form Card */}
            <div className={`w-full md:w-1/2 transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className='w-full p-8 md:p-10 bg-white dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200 dark:border-slate-700/50 relative overflow-hidden transition-colors'>
                
                {/* Decorative gradients */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
                
                {step === 'register' ? (
                  <form onSubmit={handleRegister} className="space-y-6 relative z-10">
                    <div className="text-center mb-8">
                       <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Create Account</h2>
                       <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 transition-colors">Enter your details to request access</p>
                    </div>

                    <div className="space-y-4">
                        <InputField name="adminId" type="text" placeholder="Admin ID (Access Key)" value={formData.adminId} onChange={handleChange} error={errors.adminId} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7h1a2 2 0 012 2v5a2 2 0 01-2 2h-1m-6 0H6a2 2 0 01-2-2V9a2 2 0 012-2h1m6 0V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v0m6 0h-6" /></svg>} />
                        <InputField name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} error={errors.name} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />
                        <InputField name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} error={errors.email} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>} />
                        <InputField name="role" type="text" placeholder="Role (e.g., Warden)" value={formData.role} onChange={handleChange} error={errors.role} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>} />
                        <InputField name="password" type="password" placeholder="Secure Password" value={formData.password} onChange={handleChange} error={errors.password} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>} />
                    </div>
                    
                    <button type='submit' className='w-full px-6 py-4 mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/30 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none mb-4' disabled={loading}>
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : 'Register & Send OTP'}
                    </button>
                    {!loading && message && (
                      <div className={`p-4 rounded-xl text-sm font-medium text-center ${message.startsWith('❌') ? 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-200 border border-red-200 dark:border-red-500/20' : 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-200 border border-green-200 dark:border-green-500/20'} transition-colors`}>
                          {message}
                      </div>
                    )}
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOTP} className="space-y-6 relative z-10 py-4">
                     <div className="text-center mb-8">
                       <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Verify Your Email</h2>
                       <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 transition-colors">Enter the code sent to your email</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 text-center mb-6 transition-colors">
                       <p className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest font-semibold mb-1 transition-colors">Sent To</p>
                       <p className="text-indigo-600 dark:text-indigo-400 font-medium transition-colors">{registrationEmail}</p>
                    </div>

                    <div className="py-2">
                       <InputField name="otp" type="text" placeholder="Enter 6-Digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                    </div>
                    
                    <button type="submit" className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-green-500/30 hover:from-green-500 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70" disabled={loading || otp.length !== 6}>
                       {loading ? 'Verifying...' : 'Verify & Complete'}
                    </button>
                    
                    <div className="pt-4 text-center">
                        <button type="button" className="text-sm text-slate-500 hover:text-indigo-400 transition-colors flex items-center justify-center gap-2 mx-auto" onClick={() => { setStep('register'); setMessage(''); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to details
                        </button>
                    </div>
                    
                     {!loading && message && (
                      <div className={`mt-4 p-4 rounded-xl text-sm font-medium text-center ${message.startsWith('❌') ? 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-200 border border-red-200 dark:border-red-500/20' : 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-200 border border-green-200 dark:border-green-500/20'} transition-colors`}>
                          {message}
                      </div>
                    )}
                  </form>
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
