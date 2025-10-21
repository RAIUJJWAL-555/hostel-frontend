import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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

const StudentRegistrationForm = () => {
  const navigate = useNavigate();
  // Animation ke liye state
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Form data ke liye state
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
    password:''
  });
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        onClose: () => navigate('/login'),
      });

    } catch (err) {
      toast.error(`❌ Registration failed: ${err.message}`, {
        position: 'top-center',
      });
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
        className="min-h-screen bg-cover bg-fixed bg-center pt-[90px]" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505681538360-1da3e7f41584?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="min-h-screen bg-[#1a202c]/80 p-4 sm:p-6 lg:p-8 pt-[120px] backdrop-blur-sm flex items-center justify-center">
          <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
            
            <div className={`w-full md:w-1/2 text-white transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Begin Your Journey</h1>
              <p className="text-lg text-gray-300 mt-4">
                Apply for a spot in our hostel. Fill out your details accurately to ensure a smooth application process. Welcome to your new home!
              </p>
              <div className="mt-8">
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600">
                  <img src="https://placehold.co/600x400/1A202C/4FD1C5?text=Hostel+Life" alt="Hostel illustration" className="rounded-lg"/>
                  <p className="text-center mt-4 text-sm text-teal-400">A Community of Innovators & Leaders</p>
                </div>
              </div>
            </div>

            <div className={`w-full md:w-1/2 transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className='w-full p-6 bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700'>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <h2 className="text-2xl font-bold text-center text-white mb-4">Hostel Application Form</h2>
                    <InputField name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />
                    <InputField name="applicationNumber" type="text" placeholder="Application Number" value={formData.applicationNumber} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6" /></svg>} />
                    <InputField name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>} />
                    <InputField name="dob" type="date" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
                    <div className="grid grid-cols-2 gap-3">
                      <InputField name="year" type="text" placeholder="Year" value={formData.year} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" /></svg>} />
                      <InputField name="branch" type="text" placeholder="Branch" value={formData.branch} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 016 0z" /></svg>} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <InputField name="distance" type="number" placeholder="Distance (km)" value={formData.distance} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 13v- hükümet" /></svg>} />
                      <InputField name="rank" type="number" placeholder="Rank" value={formData.rank} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} />
                    </div>
                    <InputField name="counselingRound" type="text" placeholder="Counseling Round" value={formData.counselingRound} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h4M9 12h6" /></svg>} />
                    <InputField name="password" type="password" placeholder="Create Password" value={formData.password} onChange={handleChange} icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>} />
                    <button type='submit' className='w-full px-6 py-3 mt-2 bg-teal-600 text-white font-bold rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300 transform hover:scale-105 disabled:opacity-50' disabled={loading}>
                      {loading ? 'Submitting...' : 'Apply Now'}
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

