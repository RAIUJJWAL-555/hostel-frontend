import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(footerRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 py-12 overflow-hidden border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        
        {/* About Us */}
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white border-b-2 border-indigo-500 pb-2 inline-block transition-colors duration-300">About Us</h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 transition-colors duration-300">
            Welcome to Government Polytechnic Hostel, a premier residence since 1998. We provide a safe, supportive environment with modern facilities for both boys and girls. Join us for a comfortable stay and an enriching college experience!
          </p>
        </div>

        {/* Quick Links */}
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white border-b-2 border-indigo-500 pb-2 inline-block transition-colors duration-300">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">→ Home</Link></li>
            <li><Link to="/register/student" className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">→ Registration</Link></li>
            <li><Link to="/admin/staff" className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">→ Administration</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white border-b-2 border-indigo-500 pb-2 inline-block transition-colors duration-300">Contact Us</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 space-y-1 transition-colors duration-300">
            <span className="block"><strong className="text-slate-800 dark:text-slate-200">Email:</strong> principalgpg@gmail.com</span>
            <span className="block"><strong className="text-slate-800 dark:text-slate-200">Phone:</strong> 0120 2719500</span>
            <span className="block"><strong className="text-slate-800 dark:text-slate-200">Location:</strong> Shastri Nagar, D-Block, Ghaziabad</span>
          </p>
        </div>

        {/* Map */}
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white border-b-2 border-indigo-500 pb-2 inline-block transition-colors duration-300">Find Us Here</h3>
          <div className="rounded-lg overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.4640138547247!2d77.46719987502266!3d28.67576318211705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf18a012b899f%3A0x5877fd5186901cdc!2sGovernment%20Polytechnic%20Ghaziabad!5e0!3m2!1sen!2sin!4v1757866248193!5m2!1sen!2sin"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        
      </div>

      {/* Copyright */}
      <div className={`text-center mt-10 border-t border-slate-200 dark:border-slate-800 pt-6 text-sm text-slate-500 transition-all duration-1000 ${isVisible ? 'opacity-100 delay-500' : 'opacity-0'}`}>
        <p>&copy; {new Date().getFullYear()} Government Polytechnic Ghaziabad Hostel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

