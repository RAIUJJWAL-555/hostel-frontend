import React, { useState, useEffect, useRef } from 'react';

const Facilities = () => {
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
      { threshold: 0.2 }
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

  const facilities = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-cyan-600"><path d="M12 3C7.47 3 3.53 5.39 1 9.54L12 21l11-11.46C20.47 5.39 16.53 3 12 3zm0 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /><path d="M0 0h24v24H0z" fill="none"/><path d="M6.79 12.34C8.29 11.06 10.08 10 12 10s3.71 1.06 5.21 2.34l-1.41 1.41C14.73 12.68 13.41 12 12 12s-2.73.68-3.79 1.75l-1.42-1.41z"/><path d="M3.99 9.51C6.29 7.03 9.06 5.5 12 5.5s5.71 1.53 8.01 4.01l-1.41 1.41C16.82 8.94 14.5 8 12 8s-4.82.94-6.6 2.92l-1.41-1.41z"/></svg>
      ),
      title: "Free Wifi",
      description: "Stay connected with high-speed internet across the campus.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-cyan-600"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zM21 6h-6v5h6V6zm-2 3h-2V8h2v1z" /></svg>
      ),
      title: "Nutritious Food",
      description: "Enjoy delicious and healthy meals in our spacious dining hall.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-cyan-600"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
      ),
      title: "High Security",
      description: "CCTV surveillance and on-site security ensure your safety.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-cyan-600"><path d="M12 2L1 9l4 1.5V21h14V10.5L23 9l-11-7zM16 19h-2v-4h-4v4H8v-6h8v6zm2-8.69L12 4.44 6 10.31V9l6-4.5 6 4.5v1.31z"/></svg>
      ),
      title: "Nearby Stores",
      description: "Essential stores and metro station are at walking distance.",
    },
  ];

  return (
    <div ref={sectionRef} className='py-20 bg-gray-100 dark:bg-slate-950 transition-colors duration-300'>
      <div className='max-w-7xl mx-auto px-4'>
        <h2 className={`text-4xl font-extrabold text-center mb-16 text-cyan-900 dark:text-cyan-400 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Our Facilities
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {facilities.map((facility, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-all duration-500 ease-in-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex justify-center mb-4 text-cyan-600 dark:text-cyan-400 transition-colors duration-300">{facility.icon}</div>
              <h3 className='text-xl font-bold mb-2 text-gray-800 dark:text-white transition-colors duration-300'>{facility.title}</h3>
              <p className='text-gray-600 dark:text-slate-300 transition-colors duration-300'>{facility.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facilities;
