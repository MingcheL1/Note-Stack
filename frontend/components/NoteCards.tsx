"use client";
import { ThumbsUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const NoteCards: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const sheetBestUrl = 'https://sheet.best/api/sheets/a57fa426-17d2-4fbc-87a8-9724d5219b68';

    useEffect(() => {
        const fetchData = async () => {
            if (!sheetBestUrl) {
                setError('API URL not set');
                setLoading(false);
                return;
            }

            try {
                console.log('Fetching data from:', sheetBestUrl);
                const response = await axios.get(sheetBestUrl);
                console.log('Data fetched:', response.data);
                setData(response.data);
                setLoading(false);
            } catch (error: any) {
                console.error('Error fetching data:', error);
                setError(error.message || 'Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, [sheetBestUrl]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    console.log('Data to render:', data);

    return (
        <div className="w-4/5 m-auto">
            
                {data.map((item, index) => (
                    <li key={index}>
                      <div className="bg-slate-100 rounded-md m-auto p-4">
                      <div className="h-10 w-full flex justify-between items-center">
                        <h2 className="text-2xl">{item.title}</h2>
                        <div className=" bg-blue-400 rounded-md flex items-center justify-center p-2">{item.subject}</div>
                      </div>

                        <br/>
                        <p className="ml-7" dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, '<br />') }}></p>
                        <div className="flex bg-red-600 rounded-md w-12 allign-right"><ThumbsUp />| {item.likes}</div>
                      </div>
                    </li>
                ))}
        </div>
    );
};
