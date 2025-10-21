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
      { threshold: 0.1 } // Animate when 10% of the footer is visible
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
    <footer ref={footerRef} className="bg-cyan-900 text-gray-200 py-12 mt-10 overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        
        {/* About Us */}
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl font-bold mb-4 text-white border-b-2 border-cyan-400 pb-2">About Us</h3>
          <p className="text-sm leading-relaxed">
            Welcome to Government Polytechnic Hostel, a premier residence since 1998. We provide a safe, supportive environment with modern facilities for both boys and girls. Join us for a comfortable stay and an enriching college experience!
          </p>
        </div>

        {/* Quick Links */}
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl font-bold mb-4 text-white border-b-2 border-cyan-400 pb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="flex items-center gap-2 hover:text-cyan-300 transition-colors duration-300">→ Home</Link></li>
            <li><Link to="/register/student" className="flex items-center gap-2 hover:text-cyan-300 transition-colors duration-300">→ Registration</Link></li>
            {/* <li><Link to="/facilities" className="flex items-center gap-2 hover:text-cyan-300 transition-colors duration-300">→ Facilities</Link></li> */}
            <li><Link to="/admin/staff" className="flex items-center gap-2 hover:text-cyan-300 transition-colors duration-300">→ Administration</Link></li>
            {/* <li><Link to="/guidelines" className="flex items-center gap-2 hover:text-cyan-300 transition-colors duration-300">→ Guidelines</Link></li> */}
          </ul>
        </div>

        {/* Contact Us */}
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl font-bold mb-4 text-white border-b-2 border-cyan-400 pb-2">Contact Us</h3>
          <p className="text-sm">
            <strong>Email:</strong> hostel@gpg.ac.in<br />
            <strong>Phone:</strong> +91-987-654-3210<br />
            <strong>Location:</strong> Shastri Nagar, D-Block, Ghaziabad
          </p>
        </div>

        {/* Map */}
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl font-bold mb-4 text-white border-b-2 border-cyan-400 pb-2">Find Us Here</h3>
          <div className="rounded-lg overflow-hidden shadow-lg">
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
      <div className={`text-center mt-10 border-t border-cyan-700 pt-6 text-sm transition-opacity duration-1000 ${isVisible ? 'opacity-100 delay-500' : 'opacity-0'}`}>
        <p>&copy; {new Date().getFullYear()} Government Polytechnic Ghaziabad Hostel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

