import { useRef, useState, useEffect } from 'react';
import React from 'react';
import Header from '../Component/GeneralStudent/Header.jsx'; 

// Sample data for staff members
const staffMembers = [
  {
    name: "Shivkumar Sir",
    position: "Warden (Boys Hostel)",
    phone: "+91 98765 43210",
    email: "shiv.kumar@gpg.ac.in",
    image: "https://placehold.co/300x300/E0E7FF/4338CA?text=SS",
  },
  {
    name: "Smt. Puja Mam",
    position: "Warden (Girls Hostel)",
    phone: "+91 98765 43211",
    email: "puja.m@gpg.ac.in",
    image: "https://placehold.co/300x300/FBCFE8/C026D3?text=SP",
  },
  {
    name: "Shri. Vipul Singh",
    position: "Mess Owner",
    phone: "+91 98765 43212",
    email: "vipul.singh@gpg.ac.in",
    image: "https://placehold.co/300x300/C7D2FE/4338CA?text=VS",
  },
  {
    name: "Durgesh Kumar",
    position: "Mess Worker",
    phone: "+91 98765 43213",
    email: "durgesh.k@gpg.ac.in",
    image: "https://placehold.co/300x300/E2E8F0/1E293B?text=DK",
  },
  {
    name: "Sarita Devi",
    position: "Mess Worker",
    phone: "+91 98765 43214",
    email: "sarita.d@gpg.ac.in",
    image: "https://placehold.co/300x300/FCE7F3/831843?text=SD",
  },
  {
    name: "Ramesh Chand",
    position: "Security Head",
    phone: "+91 98765 43215",
    email: "ramesh.c@gpg.ac.in",
    image: "https://placehold.co/300x300/D1FAE5/047857?text=RC",
  },
  {
    name: "Vikas Meena",
    position: "Electrician",
    phone: "+91 98765 43216",
    email: "vikas.m@gpg.ac.in",
    image: "https://placehold.co/300x300/FEF9C3/854D0E?text=VM",
  },
  {
    name: "Suresh Pal",
    position: "Plumber",
    phone: "+91 98765 43217",
    email: "suresh.p@gpg.ac.in",
    image: "https://placehold.co/300x300/E0F2FE/0891B2?text=SP",
  },
];

const StaffPage = () => {
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

  return (
    <><div>

    <Header/>
    </div>
    <div ref={sectionRef} className="min-h-screen mt-32 bg-amber-50 p-4 sm:p-6 lg:p-8 pt-[90px]">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-amber-900">Meet Our Dedicated Team</h1>
          <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
            The pillars of our hostel, ensuring a safe, comfortable, and supportive environment for every student.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {staffMembers.map((member, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-6 flex flex-col items-center">
                <img
                  src={member.image}
                  alt={`Profile of ${member.name}`}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-amber-200 shadow-lg"
                />
                <div className="text-center mt-4">
                    <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                    <p className="text-sm text-amber-700 font-semibold">{member.position}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-5 border-t border-gray-200">
                <div className="text-left space-y-3">
                  <a href={`tel:${member.phone}`} className="flex items-center text-gray-700 hover:text-amber-800 transition-colors duration-300 group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-amber-500 group-hover:text-amber-700" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>{member.phone}</span>
                  </a>
                  <a href={`mailto:${member.email}`} className="flex items-center text-gray-700 hover:text-amber-800 transition-colors duration-300 group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-amber-500 group-hover:text-amber-700" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>{member.email}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};




export default StaffPage;


