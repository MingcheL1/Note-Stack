"use client";

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
        <div className="w-4/5">
            
                {data.map((item, index) => (
                    <li key={index}>
                      <div className="bg-slate-100 rounded-md">
                        <div className="h-10 w-full grid-cols-2">
                          <h2 className="text-xl">{item.title}</h2>
                          <div>{item.subject}</div>
                        </div>
                        <p>Content: {item.content}</p>
                        <p>Likes: {item.likes}</p>
                      </div>
                    </li>
                ))}
        </div>
    );
};
