import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../GeneralStudent/Header.jsx';

// API ke liye Base URL
const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

// --- MODERN INPUT FIELD COMPONENT (Same as Admin) ---
const InputField = ({ name, type, placeholder, value, onChange, icon, error }) => (
  <div className="relative group">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-gray-400 group-focus-within:text-teal-600 dark:group-focus-within:text-teal-400 transition-colors duration-300">
      {icon}
    </span>
    <input 
      type={type} 
      name={name} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} 
      className={`w-full p-3 pl-10 bg-slate-50 dark:bg-gray-800/40 hover:bg-slate-100 dark:hover:bg-gray-800/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-200 dark:border-gray-700/50 focus:border-teal-500/50 focus:ring-teal-500/40 focus:bg-white dark:focus:bg-gray-900/60'}`}
    />
    {error && <p className="text-red-500 dark:text-red-400 text-xs mt-1 ml-2 font-medium animate-pulse">{error}</p>}
  </div>
);

const StudentRegistrationForm = () => {
  const navigate = useNavigate();
  // Animation state
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    applicationNumber: '',
    email: '',
    dob:'',
    year:'',
    branch:'',
    distance: '',
    rank: '',
    counselingRound: '',
    gender: '',
    password:''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // --- VALIDATION LOGIC (Unchanged) ---
  const validateForm = () => {
    let newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.applicationNumber.trim()) {
      newErrors.applicationNumber = "Application Number is required";
    } else if (formData.applicationNumber.length < 12) {
      newErrors.applicationNumber = "Application Number must be at least 12 digits";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    
    if (!formData.year.trim()) {
        newErrors.year = "Year is required";
    } else if (!/^\d+$/.test(formData.year)) {
        newErrors.year = "Digits only";
    }

    if (!formData.branch.trim()) {
        newErrors.branch = "Branch is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.branch)) {
        newErrors.branch = "Characters only";
    }

    if (!formData.distance) {
        newErrors.distance = "Distance is required";
    } else if (!/^\d+$/.test(formData.distance)) {
        newErrors.distance = "Digits only";
    }

    if (!formData.rank) {
        newErrors.rank = "Rank is required";
    } else if (!/^\d+$/.test(formData.rank)) {
        newErrors.rank = "Digits only";
    }

    if (!formData.counselingRound.trim()) {
        newErrors.counselingRound = "Round is required";
    } else if (!/^\d+$/.test(formData.counselingRound)) {
        newErrors.counselingRound = "Digits only";
    }

    if (!formData.gender) {
        newErrors.gender = "Gender is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Min 6 chars";
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
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
        toast.error("Please fix the errors in the form", { position: 'top-center', theme: "dark" });
        return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/student/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration Failed');

      toast.success('🎉 Registration successful! Please log in.', {
        position: 'top-center',
        autoClose: 2000,
        theme: "dark",
        onClose: () => navigate('/login'),
      });

    } catch (err) {
      toast.error(`❌ Registration failed: ${err.message}`, {
        position: 'top-center',
        theme: "dark"
      });
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div 
        ref={sectionRef} 
        className="min-h-screen mt-16 bg-gradient-to-br from-slate-50 via-gray-100 to-teal-50 dark:from-slate-950 dark:via-gray-900 dark:to-teal-950 transition-colors duration-300"
      >
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 pt-[120px] flex items-center justify-center">
          <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-start gap-8 md:gap-16">
            
            {/* Left Content Section */}
            <div className={`w-full md:w-5/12 text-slate-900 dark:text-white sticky top-24 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-teal-800 to-teal-900 dark:from-white dark:via-teal-100 dark:to-teal-200 transition-colors">
                Begin Your Journey
              </h1>
              <p className="text-lg text-slate-600 dark:text-gray-300 mt-6 leading-relaxed font-light transition-colors">
                Apply for a spot in our premium hostel facilities. Fill out your details accurately to ensure a smooth application process and join a community of innovators.
              </p>
              
              <div className="mt-10">
                {/* Enhanced Image/Card Container */}
                <div className="bg-white dark:bg-gray-900/40 p-4 rounded-2xl border border-slate-200 dark:border-teal-900/30 shadow-xl shadow-slate-200/50 dark:shadow-[0_0_30px_rgba(45,212,191,0.1)] backdrop-blur-sm group hover:border-teal-500/30 transition-all duration-500">
                  <div className="relative overflow-hidden rounded-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop" 
                      alt="Hostel Life" 
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-4 left-4">
                        <p className="text-white dark:text-teal-300 font-bold text-lg drop-shadow-md">Student Community</p>
                        <p className="text-gray-100 dark:text-gray-300 text-sm drop-shadow-md">Where friendships begin</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Section - Glassmorphism */}
            <div className={`w-full md:w-7/12 transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className='w-full p-6 sm:p-8 bg-white dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10 relative overflow-hidden transition-colors'>
                  
                  {/* Subtle top gradient line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500/0 via-teal-500/50 to-teal-500/0"></div>

                  <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-slate-800 dark:from-white dark:to-gray-300 transition-colors">
                      Hostel Application Form
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <InputField name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} error={errors.name} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />
                        </div>
                        
                        <InputField name="applicationNumber" type="text" placeholder="App. Number (JEECUP)" value={formData.applicationNumber} onChange={handleChange} error={errors.applicationNumber} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6" /></svg>} />
                        
                        <InputField name="dob" type="date" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} error={errors.dob} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />

                        <div className="md:col-span-2">
                             <InputField name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} error={errors.email} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>} />
                        </div>

                         <div className="md:col-span-2">
                             <div className="relative group">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-gray-400 group-focus-within:text-teal-600 dark:group-focus-within:text-teal-400 transition-colors duration-300">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                </span>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className={`w-full p-3 pl-10 bg-slate-50 dark:bg-gray-800/40 hover:bg-slate-100 dark:hover:bg-gray-800/60 text-slate-900 dark:text-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm appearance-none ${!formData.gender ? 'text-slate-400 dark:text-gray-500' : ''} ${errors.gender ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-200 dark:border-gray-700/50 focus:border-teal-500/50 focus:ring-teal-500/40 focus:bg-white dark:focus:bg-gray-900/60'}`}
                                >
                                    <option value="" disabled className="text-slate-400 dark:text-gray-500">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.gender && <p className="text-red-500 dark:text-red-400 text-xs mt-1 ml-2 font-medium animate-pulse">{errors.gender}</p>}
                             </div>
                         </div>

                        <InputField name="year" type="text" placeholder="Current Year (1/2/3)" value={formData.year} onChange={handleChange} error={errors.year} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" /></svg>} />
                        
                        <InputField name="branch" type="text" placeholder="Enter your full branch Name" value={formData.branch} onChange={handleChange} error={errors.branch} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} />
                        
                        <InputField name="distance" type="number" placeholder="Distance (km)" value={formData.distance} onChange={handleChange} error={errors.distance} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 01-6 0 3 3 0 016 0z" /></svg>} />
                        
                        <InputField name="rank" type="number" placeholder="Entrance Rank" value={formData.rank} onChange={handleChange} error={errors.rank} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} />
                        
                        <InputField name="counselingRound" type="text" placeholder="Round No." value={formData.counselingRound} onChange={handleChange} error={errors.counselingRound} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>} />
                        
                        <InputField name="password" type="password" placeholder="Create Password" value={formData.password} onChange={handleChange} error={errors.password} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>} />
                    </div>

                    <button type='submit' className='w-full px-6 py-4 mt-6 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-bold rounded-xl shadow-lg hover:shadow-teal-500/30 hover:from-teal-600 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none' disabled={loading}>
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting Application...
                        </span>
                      ) : 'Submit Application'}
                    </button>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentRegistrationForm;