// File: src/Student/NoticeList.jsx
import React from 'react';

const notices = [
    { id: 1, date: 'Sept 28', title: 'Mandatory Hostel Meeting for Block C', type: 'Meeting', color: 'bg-red-100 text-red-800' },
    { id: 2, date: 'Sept 25', title: 'Mess Menu Updated for October', type: 'Notice', color: 'bg-green-100 text-green-800' },
    { id: 3, date: 'Sept 20', title: 'Submit IDs for Gate Access Renewal', type: 'Important', color: 'bg-yellow-100 text-yellow-800' },
];

const NoticeList = () => (
    <ul className="space-y-4">
        {notices.map(notice => (
            <li 
                key={notice.id} 
                className="p-4 bg-white shadow-sm border-l-4 border-blue-400 hover:shadow-md transition duration-200 rounded-md cursor-pointer flex justify-between items-center"
            >
                <div>
                    <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${notice.color}`}>
                        {notice.type}
                    </span>
                    <p className="text-gray-800 font-medium mt-1">{notice.title}</p>
                </div>
                <span className="text-sm text-gray-500 font-semibold">{notice.date}</span>
            </li>
        ))}
    </ul>
);

export default NoticeList;