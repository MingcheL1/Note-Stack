
import axios from 'axios';

const sheetBestUrl = 'https://sheet.best/api/sheets/a57fa426-17d2-4fbc-87a8-9724d5219b68';

const fetchData = async () => {
    try {
        console.log('Fetching data from:', sheetBestUrl);
        const response = await axios.get(sheetBestUrl);
        console.log('Data fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const loadData = async () => {
    const data = await fetchData();
    if (data) {
        console.log('Data stored in variable:', data);
    } else {
        console.log('Failed to fetch data');
    }
};

loadData();



