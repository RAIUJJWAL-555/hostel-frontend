import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;
console.log("Backend API Base URL:", BASE_URL);

// InputField component
const InputField = ({ name, type, placeholder, value, onChange, icon, required = true, error }) => (
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
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.userType === 'student') {
      if (!formData.studentIdentifier.trim()) {
        newErrors.studentIdentifier = "Application Number is required";
      } else if (formData.studentIdentifier.length < 12) {
        newErrors.studentIdentifier = "Application Number must be at least 12 digits";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      }
    } else if (formData.userType === 'admin') {
      if (!formData.adminIdentifier.trim()) {
        newErrors.adminIdentifier = "Admin Email is required";
      } else if (!emailRegex.test(formData.adminIdentifier)) {
        newErrors.adminIdentifier = "Invalid email format";
      }

      if (adminLoginMethod === 'password') {
        if (!formData.password) {
          newErrors.password = "Password is required";
        }
      } else if (adminLoginMethod === 'otp') {
        if (otpSent && (!otpValue || otpValue.length !== 6)) {
           // handled by disabled button
        }
      }
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user types
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleAdminMethodChange = (e) => {
    setAdminLoginMethod(e.target.value);
    setOtpSent(false);
    setFormData((prev) => ({ ...prev, password: '' }));
    setOtpValue('');
    setErrors({}); // Clear errors when switching method
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
    if (!validateForm()) return;
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
      <ToastContainer theme="dark" />
      <div 
        ref={sectionRef} 
        className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-indigo-50 dark:from-slate-950 dark:via-gray-900 dark:to-indigo-950 transition-colors duration-300" 
      >
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 pt-[130px] flex items-center justify-center">
          <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            
            <div className={`w-full md:w-1/2 text-slate-900 dark:text-white transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="mb-6 inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-full text-indigo-700 dark:text-indigo-300 text-xs font-bold tracking-widest uppercase transition-colors">
                Secure Portal
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white transition-colors">
                 Welcome <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Back!</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed transition-colors">
                Please log in to access your dashboard, view announcements, and manage your profile securely.
              </p>
              
               <div className="mt-10 bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm transition-colors shadow-lg dark:shadow-none">
                   <div className="flex items-center space-x-4 mb-4">
                       <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl text-indigo-600 dark:text-indigo-400 transition-colors">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                       </div>
                       <div>
                           <h3 className="font-bold text-slate-900 dark:text-white transition-colors">Secure Encrypted Login</h3>
                           <p className="text-xs text-slate-500 dark:text-slate-500 transition-colors">Your data is protected with industry standard encryption</p>
                       </div>
                   </div>
                   <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
                       <div className="h-full bg-indigo-500/50 w-2/3"></div>
                   </div>
              </div>
            </div>

            <div className={`w-full md:w-1/2 transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className='w-full p-8 md:p-10 bg-white dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200 dark:border-slate-700/50 relative overflow-hidden transition-colors'>
                  
                   {/* Decorative gradients */}
                   <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                   <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>

                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Member Login</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 transition-colors">Select your role to continue</p>
                    </div>

                    {/* Role Selector */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                         <label className="cursor-pointer">
                             <input type="radio" className="peer sr-only" name="userType" value="student" checked={formData.userType === 'student'} onChange={(e) => { handleChange(e); setAdminLoginMethod('password'); setOtpSent(false); }} />
                             <div className="p-3 text-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:border-indigo-500 transition-all font-medium">
                                 Student
                             </div>
                         </label>
                         <label className="cursor-pointer">
                             <input type="radio" className="peer sr-only" name="userType" value="admin" checked={formData.userType === 'admin'} onChange={(e) => { handleChange(e); setAdminLoginMethod('password'); setOtpSent(false); }} />
                             <div className="p-3 text-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:border-indigo-500 transition-all font-medium">
                                 Admin
                             </div>
                         </label>
                    </div>
                    
                    {formData.userType === 'student' && (
                        <div className="space-y-4 animate-fade-in">
                            <InputField name="studentIdentifier" type="text" placeholder="Application Number" value={formData.studentIdentifier} onChange={handleChange} error={errors.studentIdentifier} icon={<svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6" /></svg>} />
                        </div>
                    )}

                    {formData.userType === 'admin' && (
                      <div className="space-y-4 animate-fade-in">
                        <InputField name="adminIdentifier" type="email" placeholder="Admin Email" value={formData.adminIdentifier} onChange={handleChange} error={errors.adminIdentifier} icon={<svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>} />
                        
                        <div className="flex bg-slate-900/50 p-1.5 rounded-xl">
                             <label className="flex-1 cursor-pointer">
                                 <input type="radio" className="peer sr-only" value="password" checked={adminLoginMethod === 'password'} onChange={handleAdminMethodChange}/>
                                 <div className="py-2 text-center rounded-lg text-sm font-medium text-slate-400 peer-checked:bg-indigo-500/20 peer-checked:text-indigo-300 transition-all">Password</div>
                             </label>
                             <label className="flex-1 cursor-pointer">
                                 <input type="radio" className="peer sr-only" value="otp" checked={adminLoginMethod === 'otp'} onChange={handleAdminMethodChange}/>
                                 <div className="py-2 text-center rounded-lg text-sm font-medium text-slate-400 peer-checked:bg-indigo-500/20 peer-checked:text-indigo-300 transition-all">OTP Login</div>
                             </label>
                        </div>
                      </div>
                    )}

                    {(formData.userType === 'student' || (formData.userType === 'admin' && adminLoginMethod === 'password')) && (
                      <div className="space-y-4 animate-fade-in">
                        <InputField name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} error={errors.password} icon={<svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>} />
                      </div>
                    )}
                    
                    {formData.userType === 'admin' && adminLoginMethod === 'otp' && otpSent && (
                       <div className="space-y-4 animate-fade-in">
                           <InputField name="otpValue" type="text" placeholder="Enter 6-Digit OTP" value={otpValue} onChange={(e) => setOtpValue(e.target.value)} icon={<svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>} />
                           <div className="text-center">
                                <button type="button" onClick={() => { setOtpSent(false); setOtpValue(''); }} className="text-sm text-slate-500 hover:text-indigo-400 transition-colors">
                                    Wrong email? Try again
                                </button>
                           </div>
                       </div>
                    )}

                    <button type="submit" className='w-full px-6 py-4 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/30 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none' disabled={loading || (formData.userType === 'admin' && adminLoginMethod === 'otp' && otpSent && otpValue.length !== 6)}>
                      {loading ? (
                          <span className="flex items-center justify-center space-x-2">
                             <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                             <span>Processing...</span>
                          </span>
                      ) : (formData.userType === 'admin' && adminLoginMethod === 'otp' && !otpSent) ? 'Send Login OTP' : 'Login Securely'}
                    </button>
                    
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

