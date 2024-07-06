"use client";
import { ThumbsUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const NoteCards: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const sheetBestUrl = 'SHEETS_URL';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(sheetBestUrl);
                setData(response.data);
                setLoading(false);
            } catch (error: any) {
                setError(error.message || 'Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const filteredData = data.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-4/5 m-auto lg:grid-cols-3 ">
            {filteredData.map((item, index) => (
                <li key={index}>
                    <div>
                        <div className="w-full bg-slate-100 rounded-md m-auto p-4 mt-5">
                            <div className="h-10 w-full flex justify-between items-center">
                                <h2 className="text-2xl font-bold">{item.title}</h2>
                                <div className=" bg-blue-400 rounded-md flex items-center justify-center p-2">{item.subject}</div>
                            </div>
                            <br/>
                            <p className="ml-7 jetbrains-mono " dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, '<br />') }}></p>
                        </div>
                    </div>
                </li>
            ))}
        </div>
    );
};
