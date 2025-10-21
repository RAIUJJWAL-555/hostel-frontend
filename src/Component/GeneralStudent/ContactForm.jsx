import React, { useState, useEffect, useRef } from 'react';

import Header from './Header'; 

const ContactPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Is effect se scroll karne par animation trigger hota hai
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

  // Is component ko render karne ke liye ek mock Header
  

  return (
    <>
      <Header />
      <div 
        ref={sectionRef} 
        className="min-h-screen bg-cover bg-fixed bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="min-h-screen bg-[#1F2A44]/80 p-4 sm:p-6 lg:p-8 pt-[120px] backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
            
            {/* Left Side Text Content */}
            <div className={`w-full md:w-1/2 text-white transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h1 className="text-4xl md:text-5xl font-extrabold">Get In Touch</h1>
              <p className="text-lg text-gray-300 mt-4">
                Have questions or need assistance? Our team is here to help. Fill out the form, and we'll get back to you as soon as possible.
              </p>
              <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" /></svg>
                      <span className="text-gray-300">Response within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      <span className="text-gray-300">All queries welcome</span>
                  </div>
              </div>
            </div>

            {/* Right Side Form */}
            <div className={`w-full md:w-1/2 transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className='w-full p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20'>
                <form>
                  <div className='mb-4'>
                    <select name="subject" defaultValue="" required className='w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300'>
                      <option value="" disabled className="text-gray-500">Select a subject</option>
                      <option value="hostel-query" className="text-black">Hostel Query</option>
                      <option value="complaints" className="text-black">Complaints</option>
                      <option value="other" className="text-black">Other</option>
                    </select>
                  </div>

                  <div className='mb-4'>
                    <input type="text" name="fullName" placeholder='Enter your full name' required className='w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300'/>
                  </div>
                  
                  <div className='mb-4'>
                    <input type="tel" name="phone" placeholder='Enter your phone number' required className='w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300'/>
                  </div>

                  <div className='mb-4'>
                    <input type="email" name="email" placeholder='Enter your email' required className='w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300'/>
                  </div>
                  
                  <div className='mb-4'>
                    <textarea name="description" placeholder='Describe your query or issue' rows="4" required className='w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300'></textarea>
                  </div>

                  <div>
                    <button type='submit' className='w-full px-6 py-3 bg-cyan-600 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300 transform hover:scale-105'>
                      Submit Query
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;

