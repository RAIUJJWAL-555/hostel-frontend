import React, { useState, useEffect, useRef } from "react";

// Helper component for CSS animations
const StyleInjector = () => (
  <style>{`
    @keyframes scroll-up {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-100%);
      }
    }
    .animate-scroll-up {
      animation: scroll-up 15s linear infinite;
    }
  `}</style>
);

const HostelLandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.2 } // Trigger animation when 20% of the section is visible
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

  const hostel1 = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop";
  const hostel2 = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop";
  
  const notifications = [
    "SC/ST students' last day to apply for hostel extended to 25th October.",
    "Mess fees will be accepted using cash only.",
    "Hostel allotment list for 2nd year will be published on 22nd October.",
    "Mandatory attendance for the upcoming cleanliness drive.",
    "SC/ST students' last day to apply for hostel extended to 25th October.", // Duplicate for seamless loop
    "Mess fees will be accepted using cash only.", // Duplicate for seamless loop
    "Hostel allotment list for 2nd year will be published on 22nd October.", // Duplicate for seamless loop
    "Mandatory attendance for the upcoming cleanliness drive.", // Duplicate for seamless loop
  ];

  return (
    <>
      <StyleInjector />
      <div ref={sectionRef} className="bg-gray-50 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-12">
          
          {/* --- Main Content Section --- */}
          <div className="w-full min-h-screen flex items-center">
            <div className="flex-grow flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                <div className={`relative group overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-1000 ease-in-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                  <img className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out" src={hostel1} alt="Comfortable hostel room"/>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">Vibrant Student Life</p>
                </div>
                <div className={`relative group overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-1000 ease-in-out ${isVisible ? 'translate-x-0 opacity-100 delay-300' : '-translate-x-full opacity-0'}`}>
                  <img className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out" src={hostel2} alt="Hostel exterior"/>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">Secure & Modern Facilities</p>
                </div>
              </div>
              <div className={`bg-white border border-cyan-100 w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-10 rounded-2xl shadow-xl transition-all duration-1000 ease-in-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                <h1 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-cyan-800 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Welcome to GPG Hostel</h1>
                <div className={`mt-5 text-gray-700 space-y-5 text-justify transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <p className="font-serif text-base sm:text-lg leading-relaxed">A warm greeting from Government Polytechnic, Ghaziabad! We welcome you to our vibrant campus, where learning meets comfort and growth.</p>
                  <p className="font-serif text-base sm:text-lg leading-relaxed">Our hostel is a second home, providing a safe, comfortable, and well-managed environment. It's a place to forge friendships, create memories, and focus on your academic journey.</p>
                </div>
                <p className={`mt-8 font-bold text-cyan-700 self-end transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>THANK YOU!!</p>
              </div>
            </div>
          </div>

          {/* --- Sidebar Section (now below main content) --- */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Notifications Card */}
              <div className={`w-full md:w-1/2 bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-xl font-bold bg-cyan-800 text-white py-4 px-6 text-center">Notifications</h2>
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full animate-scroll-up">
                    <ul className="text-gray-700">
                      {notifications.map((note, index) => (
                        <li key={index} className="py-3 px-6 border-b border-gray-200">{note}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Important Links Card */}
              <div className={`w-full md:w-1/2 bg-red-600 text-white rounded-2xl shadow-xl p-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-xl font-bold bg-red-700 text-white py-4 px-6 text-center -m-6 rounded-t-2xl mb-6">Important Links</h2>
                <div className="flex flex-col gap-4">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white text-red-700 py-3 px-5 rounded-full font-semibold hover:bg-red-100 transition-all duration-300 transform hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Download Rules & Regulations
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white text-red-700 py-3 px-5 rounded-full font-semibold hover:bg-red-100 transition-all duration-300 transform hover:scale-105">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                    Download Eligibility Criteria
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostelLandingPage;

