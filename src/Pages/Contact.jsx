import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, User } from 'lucide-react';
import { toast } from 'react-toastify';
import Header from '../Component/GeneralStudent/Header';
import Footer from '../Component/GeneralStudent/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    subject: '',
    fullName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate generic submission
    setTimeout(() => {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ subject: '', fullName: '', phone: '', email: '', message: '' });
        setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="transition-colors duration-300">
      <Header />
      <div className="min-h-screen mt-16 bg-gradient-to-br from-slate-50 via-gray-100 to-indigo-50 dark:from-slate-950 dark:via-gray-900 dark:to-indigo-950 pt-[130px] pb-16 px-4 transition-colors duration-300">
        
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 text-sm font-semibold tracking-wide mb-4 border border-indigo-200 dark:border-indigo-500/30">
              CONTACT & SUPPORT
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 drop-shadow-lg">
              Get in Touch with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Hostel Admin</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Have questions about hostel life, fees, or facilities? We're here to help. Reach out to us through any of the channels below.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* LEFT COLUMN: Contact Info */}
            <motion.div 
               variants={containerVariants}
               initial="hidden"
               animate="visible"
               className="space-y-8"
            >
                {/* Info Card */}
                <motion.div 
                    variants={itemVariants}
                    className="p-8 rounded-3xl bg-white dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-colors duration-300"
                >
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-700 pb-4 transition-colors">Contact Information</h2>
                    
                    <div className="space-y-6">
                        <div className="flex items-start group">
                            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                                <Phone size={24} />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wide">Phone</p>
                                <p className="text-lg text-slate-800 dark:text-slate-200 font-semibold mt-1">0120 2719500</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Mon-Fri, 9am - 5pm</p>
                            </div>
                        </div>

                        <div className="flex items-start group">
                            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                                <Mail size={24} />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wide">Email</p>
                                <p className="text-lg text-slate-800 dark:text-slate-200 font-semibold mt-1">principalgpg@gmail.com</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Response within 24 hours</p>
                            </div>
                        </div>

                        <div className="flex items-start group">
                            <div className="p-3 rounded-xl bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 group-hover:bg-pink-100 dark:group-hover:bg-pink-500/20 group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors">
                                <MapPin size={24} />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wide">Location</p>
                                <p className="text-lg text-slate-800 dark:text-slate-200 font-semibold mt-1">GPG Hostel Campus</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Hapur Road, Near Petrol Pump
D, Block Shastri Nagar
Ghaziabad (201002)</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Map/Hours Generic Card */}
                 <motion.div 
                    variants={itemVariants} 
                    className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-between transition-colors duration-300"
                 >
                     <div className="flex items-center space-x-4">
                         <div className="p-3 bg-white dark:bg-white/10 rounded-full text-indigo-600 dark:text-white transition-colors">
                             <Clock size={24} />
                         </div>
                         <div>
                             <p className="text-indigo-900 dark:text-indigo-200 font-semibold transition-colors">Office Hours</p>
                             <p className="text-indigo-700/60 dark:text-indigo-100/60 text-sm transition-colors">10:00 AM - 05:00 PM</p>
                         </div>
                     </div>
                     <div className="h-10 w-[1px] bg-indigo-500/30 mx-4"></div>
                     <div className="text-right">
                         <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30">
                             OPEN NOW
                         </span>
                     </div>
                 </motion.div>
            </motion.div>

            {/* RIGHT COLUMN: Form */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-slate-800/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden transition-colors duration-300"
            >
                {/* Decorative blobs */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 relative z-10 transition-colors">Send a Message</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 relative z-10 transition-colors">Fill out the form below and we'll get back to you shortly.</p>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1 transition-colors">Subject</label>
                        <div className="relative">
                            <MessageSquare className="absolute left-4 top-3.5 text-slate-400 dark:text-slate-500 transition-colors" size={18}/>
                            <select 
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-slate-900 dark:text-slate-200 appearance-none transition-all"
                                required
                            >
                                <option value="" disabled>Select a subject</option>
                                <option value="admission">Admission Enquiry</option>
                                <option value="complaint">Complaint</option>
                                <option value="Hostel">Hostel Facilities</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1 transition-colors">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 text-slate-400 dark:text-slate-500 transition-colors" size={18}/>
                                <input 
                                    type="text" 
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-slate-900 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-600 transition-all"
                                    required
                                />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1 transition-colors">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-3.5 text-slate-400 dark:text-slate-500 transition-colors" size={18}/>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91..."
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-slate-900 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-600 transition-all"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1 transition-colors">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-slate-400 dark:text-slate-500 transition-colors" size={18}/>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-slate-900 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-600 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1 transition-colors">Message</label>
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            placeholder="How can we help you?"
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-slate-900 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-600 transition-all resize-none"
                            required
                        ></textarea>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 flex items-center justify-center space-x-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                       {isSubmitting ? (
                           <span>Sending...</span>
                       ) : (
                           <>
                              <Send size={20} />
                              <span>Send Message</span>
                           </>
                       )}
                    </motion.button>
                </form>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
