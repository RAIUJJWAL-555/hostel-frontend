import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, User, Shield, PenTool, Wrench, Droplet } from 'lucide-react';
import Header from '../Component/GeneralStudent/Header.jsx';

// Data Source
const staffMembers = [
  {
    name: "Shivkumar Sir",
    position: "Warden (Boys Hostel)",
    phone: "+91 98765 43210",
    email: "shiv.kumar@gpg.ac.in",
    image: "https://placehold.co/300x300/4F46E5/FFFFFF?text=SS",
    roleIcon: Shield,
    color: "indigo"
  },
  {
    name: "Smt. Puja Mam",
    position: "Warden (Girls Hostel)",
    phone: "+91 98765 43211",
    email: "puja.m@gpg.ac.in",
    image: "https://placehold.co/300x300/EC4899/FFFFFF?text=SP",
    roleIcon: Shield,
    color: "pink"
  },
  {
    name: "Shri. Vipul Singh",
    position: "Mess Manager",
    phone: "+91 98765 43212",
    email: "vipul.singh@gpg.ac.in",
    image: "https://placehold.co/300x300/F59E0B/FFFFFF?text=VS",
    roleIcon: User,
    color: "amber"
  },
  {
    name: "Durgesh Kumar",
    position: "Mess Staff",
    phone: "+91 98765 43213",
    email: "durgesh.k@gpg.ac.in",
    image: "https://placehold.co/300x300/64748B/FFFFFF?text=DK",
    roleIcon: User,
    color: "slate"
  },
  {
    name: "Sarita Devi",
    position: "Mess Staff",
    phone: "+91 98765 43214",
    email: "sarita.d@gpg.ac.in",
    image: "https://placehold.co/300x300/64748B/FFFFFF?text=SD",
    roleIcon: User,
    color: "slate"
  },
  {
    name: "Ramesh Chand",
    position: "Security Head",
    phone: "+91 98765 43215",
    email: "ramesh.c@gpg.ac.in",
    image: "https://placehold.co/300x300/10B981/FFFFFF?text=RC",
    roleIcon: Shield,
    color: "emerald"
  },
  {
    name: "Vikas Meena",
    position: "Electrician",
    phone: "+91 98765 43216",
    email: "vikas.m@gpg.ac.in",
    image: "https://placehold.co/300x300/EAB308/FFFFFF?text=VM",
    roleIcon: PenTool,
    color: "yellow"
  },
  {
    name: "Suresh Pal",
    position: "Plumber",
    phone: "+91 98765 43217",
    email: "suresh.p@gpg.ac.in",
    image: "https://placehold.co/300x300/06B6D4/FFFFFF?text=SP",
    roleIcon: Droplet,
    color: "cyan"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
};

const AdministrationPage = () => {
  return (
    <div className="transition-colors duration-300">
      <Header />
      {/* Dark Gradient Background */}
      <div className="min-h-screen mt-16 bg-gradient-to-br from-slate-50 via-gray-100 to-indigo-50 dark:from-slate-950 dark:via-gray-900 dark:to-indigo-950 pt-[130px] pb-16 px-4 transition-colors duration-300">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 text-sm font-semibold tracking-wide mb-4 border border-indigo-200 dark:border-indigo-500/30">
            CAMPUS ADMINISTRATION
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 drop-shadow-lg">
            Meet the Team Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Secure Living</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Our dedicated wardens, security, and maintenance staff work round the clock to ensure a safe, comfortable, and vibrant hostel environment for every student.
          </p>
        </motion.div>

        {/* Staff Grid */}
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {staffMembers.map((member, index) => {
              const RoleIcon = member.roleIcon || User;
              return (
                <motion.div 
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  className="bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden border border-slate-200 dark:border-slate-700/50 group hover:border-indigo-500/50 transition-colors duration-300"
                >
                  <div className="relative h-32 bg-slate-900/50">
                    <div className={`absolute inset-0 bg-${member.color}-500/20 group-hover:bg-${member.color}-500/30 transition-colors duration-300`}></div>
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 p-1.5 bg-slate-800 rounded-full border border-slate-700">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover border-2 border-slate-600 shadow-md group-hover:border-indigo-400 transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-16 pb-6 px-6 text-center">
                     <div className="flex justify-center mb-2">
                        <RoleIcon size={18} className="text-slate-400 dark:text-slate-500" />
                     </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{member.name}</h3>
                    <p className={`text-sm font-medium text-${member.color || 'indigo'}-400 uppercase tracking-wider mb-6`}>
                      {member.position}
                    </p>

                    <div className="space-y-3 text-left">
                      <a 
                        href={`tel:${member.phone}`} 
                        className="flex items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border border-slate-200 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-500/30 text-slate-600 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-200 transition-all duration-200 group/link"
                      >
                        <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-full mr-3 group-hover/link:text-indigo-600 dark:group-hover/link:text-indigo-400 text-slate-500 dark:text-slate-400 transition-colors">
                            <Phone size={16} />
                        </div>
                        <span className="font-medium text-sm">{member.phone}</span>
                      </a>
                      
                      <a 
                        href={`mailto:${member.email}`}
                        className="flex items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border border-slate-200 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-500/30 text-slate-600 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-200 transition-all duration-200 group/link"
                      >
                         <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-full mr-3 group-hover/link:text-indigo-600 dark:group-hover/link:text-indigo-400 text-slate-500 dark:text-slate-400 transition-colors">
                            <Mail size={16} />
                        </div>
                        <span className="font-medium text-sm truncate">{member.email}</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdministrationPage;


