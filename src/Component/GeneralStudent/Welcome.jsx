import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// A small component to inject our CSS animations into the document head
const StyleInjector = () => (
  <style>
    {`
      @keyframes ken-burns {
        0% {
          transform: scale(1) translate(0, 0);
        }
        50% {
          transform: scale(1.1) translate(-2%, 2%);
        }
        100% {
          transform: scale(1) translate(0, 0);
        }
      }
      .animate-ken-burns {
        animation: ken-burns 15s ease-in-out infinite;
      }

      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in-up {
        animation: fade-in-up 1s ease-out forwards;
      }
      
      .animation-delay-300 {
        animation-delay: 300ms;
      }
      .animation-delay-600 {
        animation-delay: 600ms;
      }

      @keyframes blink-caret {
        from, to { border-color: transparent }
        50% { border-color: white; }
      }
      .typing-cursor::after {
        content: '';
        border-right: 2px solid white;
        animation: blink-caret .75s step-end infinite;
        margin-left: 4px;
      }
    `}
  </style>
);


const Welcome = () => {
  const [typedText, setTypedText] = useState('');
  const textRef = useRef(0);
  const charRef = useRef(0);
  const isDeletingRef = useRef(false);

  // Array of phrases to be typed out
  const phrases = [
    "A place to share memories and achievements.",
    "A vibrant community of learners and leaders.",
    "Your home away from home.",
    "Where friendships begin and last a lifetime."
  ];

  useEffect(() => {
    // This effect is responsible for the typing animation.
    // It's set to run only once on component mount due to the empty dependency array.
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayAfterTyping = 1500;

    const handleTyping = () => {
      const currentPhrase = phrases[textRef.current];
      
      if (isDeletingRef.current) {
        // Handle deleting text
        setTypedText(currentPhrase.substring(0, charRef.current - 1));
        charRef.current--;
        if (charRef.current === 0) {
          isDeletingRef.current = false;
          textRef.current = (textRef.current + 1) % phrases.length;
        }
      } else {
        // Handle typing text
        setTypedText(currentPhrase.substring(0, charRef.current + 1));
        charRef.current++;
        if (charRef.current === currentPhrase.length) {
          isDeletingRef.current = true;
          // Pause before deleting
          setTimeout(handleTyping, delayAfterTyping);
          return;
        }
      }

      const speed = isDeletingRef.current ? deletingSpeed : typingSpeed;
      setTimeout(handleTyping, speed);
    };

    const timeoutId = setTimeout(handleTyping, typingSpeed);
    
    // Cleanup function to clear timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, []); // Empty array ensures this effect runs only once on mount


  return (
    <>
      <StyleInjector />
      <div className='relative w-full h-screen overflow-hidden bg-gray-900 '>
        {/* Background Image with Ken Burns Effect */}
        <div 
          className='absolute inset-0 bg-cover bg-center animate-ken-burns' 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop')" }}
        ></div>
        
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent'></div>
        
        {/* Content */}
        <div className='relative h-full flex flex-col items-center justify-center text-center text-white p-4 z-10 pt-[150px]'>
          
          <h1 className='text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg animate-fade-in-up' style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
            Welcome to GPG Hostel
          </h1>
          
          <p className='mt-4 text-lg md:text-xl max-w-2xl animate-fade-in-up animation-delay-300 typing-cursor h-7'>
            {typedText}
          </p>
          
          <div className='mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600'>
            <Link 
              to="/register/student" 
              className='bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
            >
              Apply Now
            </Link>
            <a 
              href="#explore" 
              className='bg-transparent border-2 border-white text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75'
            >
              Explore Facilities
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
