import React, { useState, useEffect, useRef } from 'react';

// Fee data for easier management and rendering
const feeData = {
  // boys: [
  //   { category: 'General', roomFee: '3,500', messFee: '3,500', total: '45,500', color: 'cyan' },
  //   { category: 'OBC', roomFee: '3,250', messFee: '3,200', total: '41,650', color: 'blue' },
  //   { category: 'SC/ST', roomFee: '2,800', messFee: '2,700', total: '35,200', color: 'indigo' },
  // ],
  girls: [
    { category: 'General', roomFee: '3,200', messFee: '3,500', total: '45,200', color: 'pink' },
    { category: 'OBC', roomFee: '2,950', messFee: '3,200', total: '41,350', color: 'purple' },
    { category: 'SC/ST', roomFee: '2,600', messFee: '2,700', total: '35,000', color: 'violet' },
  ],
};

const HostelFee = () => {
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
      { threshold: 0.1 } // Start animation when 10% of the component is visible
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

  const hostelFeesdetail = "The hostel fees are structured to be affordable and inclusive, covering accommodation and monthly mess charges. We offer special considerations for different categories as per government norms to ensure that every student has access to comfortable and secure lodging. The total annual fee is a sum of the yearly room fee and 11 months of mess fees.";

  const colorVariants = {
    cyan: { bg: 'bg-cyan-50', border: 'border-cyan-500', text: 'text-cyan-800', shadow: 'hover:shadow-cyan-200/50' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-800', shadow: 'hover:shadow-blue-200/50' },
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-800', shadow: 'hover:shadow-indigo-200/50' },
    pink: { bg: 'bg-pink-50', border: 'border-pink-500', text: 'text-pink-800', shadow: 'hover:shadow-pink-200/50' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-800', shadow: 'hover:shadow-purple-200/50' },
    violet: { bg: 'bg-violet-50', border: 'border-violet-500', text: 'text-violet-800', shadow: 'hover:shadow-violet-200/50' },
  };

  const FeeCard = ({ data, index }) => {
    const colors = colorVariants[data.color] || colorVariants.cyan;
    return (
      <div className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 100}ms` }}>
        <div className={`p-6 rounded-2xl border-t-4 ${colors.bg} ${colors.border} ${colors.shadow} shadow-lg hover:shadow-xl hover:-translate-y-2 h-full flex flex-col`}>
          <h3 className={`text-2xl font-bold ${colors.text} mb-4`}>{data.category}</h3>
          <div className="space-y-3 text-left text-gray-700 flex-grow">
            <p className="flex justify-between items-center"><span>Room Fee</span> <span className="font-semibold text-lg">₹ {data.roomFee}<span className="text-sm font-normal">/year</span></span></p>
            <p className="flex justify-between items-center"><span>Mess Fee</span> <span className="font-semibold text-lg">₹ {data.messFee}<span className="text-sm font-normal">/month</span></span></p>
          </div>
          <div className={`mt-6 pt-4 border-t-2 border-dashed ${colors.border}`}>
            <p className="text-lg font-semibold text-gray-600">Total Annual Fee</p>
            <p className={`text-4xl font-extrabold ${colors.text}`}>₹ {data.total}</p>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div ref={sectionRef} className='w-full bg-gray-50 py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto text-center'>
        
        <h1 className={`text-4xl md:text-5xl font-extrabold text-cyan-900 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Hostel Fees Details
        </h1>
        <p className={`font-sans text-lg text-gray-600 my-6 max-w-3xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {hostelFeesdetail}
        </p>

        {/* Hostel Sections */}
        <div className="mt-12 space-y-16">
          {/* Boys Hostel */}
          {/* <div>
            <h2 className={`text-3xl font-bold mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {feeData.boys.map((item, index) => <FeeCard key={`boys-${index}`} data={item} index={index + 2} />)}
            </div>
          </div> */}

          {/* Girls Hostel */}
          <div>
            <h2 className={`text-3xl font-bold mb-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {feeData.girls.map((item, index) => <FeeCard key={`girls-${index}`} data={item} index={index + 5} />)}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HostelFee;
