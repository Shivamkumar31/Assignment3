// src/api/mockApi.js
import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/** Fetches a list of posts to simulate dashboard data. */
export const fetchDashboardData = async () => {
  try {
    // Fetch a small subset (e.g., 10 posts) for the dashboard
    const response = await axios.get(`${API_BASE_URL}/posts?_limit=10`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

/** Fetches a specific user's details. */
export const fetchUserDetails = async (userId = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};