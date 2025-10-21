// File: src/Student/ProfileCard.jsx
import React from 'react';

// The component now accepts 'studentData' as a prop
const ProfileCard = ({ studentData }) => {
    
    // Fallback while data might be loading or if prop is missing
    if (!studentData) {
        return (
            <div className="space-y-4 text-center p-5 text-gray-500">
                <p>Loading personal details...</p>
            </div>
        );
    }

    // Determine the text color for status badge
    const statusColor = 
        studentData.status === 'approved' ? 'bg-green-100 text-green-700' :
        studentData.status === 'rejected' ? 'bg-red-100 text-red-700' :
        'bg-yellow-100 text-yellow-700';

    return (
        <div className="space-y-4">
            {/* --- Application Status Badge --- */}
            <div className="flex justify-between items-center pb-2 border-b">
                <h3 className="text-xl font-bold text-gray-800">Application Details</h3>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full capitalize ${statusColor}`}>
                    {studentData.status}
                </span>
            </div>

            {/* --- Core Application Details --- */}
            <div className="space-y-3 text-gray-700 text-sm">
                <p><strong>Name:</strong> {studentData.name}</p>
                <p><strong>Application No:</strong> {studentData.applicationNumber}</p>
                <p><strong>Email:</strong> {studentData.email}</p>
                <p><strong>DOB:</strong> {studentData.dob}</p>
                <p><strong>Branch:</strong> {studentData.branch}</p>
                <p><strong>Current Year:</strong> {studentData.year}</p>
            </div>
            
            {/* --- Hostel Allotment Details --- */}
            <div className="pt-3 border-t">
                <h4 className="text-lg font-bold text-indigo-700 mb-2">Hostel Allotment</h4>
                <p className="text-gray-700">
                    <strong>Allotted Room:</strong> 
                    <span className="ml-2 font-semibold text-green-600">
                        {studentData.roomAllotted || 'Not yet allotted'}
                    </span>
                </p>
                <p className="text-gray-700">
                    <strong>Distance (km):</strong> {studentData.distance}
                </p>
                <p className="text-gray-700">
                    <strong>Merit Rank:</strong> {studentData.rank}
                </p>
            </div>


            <button className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
                Edit Application
            </button>
        </div>
    );
};

export default ProfileCard;