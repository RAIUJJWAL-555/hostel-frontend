import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ComplaintBox from './ComplaintBox';

const ComplaintBoxWrapper = () => {
    // Extract student data from the Dashboard context
    const { student, handleRefreshData } = useOutletContext();

    if (!student) return null;

    return (
        <ComplaintBox 
            studentData={student} 
            onComplaintSubmitted={handleRefreshData} 
        />
    );
};

export default ComplaintBoxWrapper;
