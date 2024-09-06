// src/utils/axios.ts

import axios from 'axios';

// Assuming you have a meta tag with the CSRF token in your main HTML file
const token = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // Replace with your API base URL
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': token || '',
    }
});

export default instance;
