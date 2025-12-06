import React, { useState, useEffect } from "react";
import { Clock, AlertCircle } from "lucide-react";

const NoticeList = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notices?activeOnly=true`);
            if (response.ok) {
                const data = await response.json();
                setNotices(data);
            }
        } catch (error) {
            console.error("Error fetching notices:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center py-4 text-gray-500">Loading notices...</div>;
    }

    if (notices.length === 0) {
        return (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">No active notices at the moment.</p>
            </div>
        );
    }

    return (
        <ul className="space-y-4">
            {notices.map((notice) => (
                <li
                    key={notice._id}
                    className="p-4 bg-white shadow-sm border-l-4 border-indigo-500 hover:shadow-md transition duration-200 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                >
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                             <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                                Notice
                            </span>
                        </div>
                        <h4 className="text-gray-800 font-semibold text-lg">{notice.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{notice.content}</p>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 whitespace-nowrap bg-gray-50 px-2 py-1 rounded">
                        <Clock size={14} className="mr-1" />
                        {new Date(notice.createdAt).toLocaleDateString(undefined, {
                            month: 'short', day: 'numeric', year: 'numeric'
                        })}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default NoticeList;