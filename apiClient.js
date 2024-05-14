const axios = require('axios');
const NodeCache = require('node-cache');

// Create a new instance of NodeCache
const cache = new NodeCache();

async function fetchData(apiUrl, endpoint, params, cacheTTL = 60) {
    const cacheKey = `${endpoint}-${JSON.stringify(params)}`;

    // Check if the response is cached
    const cachedData = cache.get(cacheKey);
    if (cachedData !== undefined) {
        console.log('Data retrieved from cache');
        return cachedData;
    }

    try {
        const response = await axios.get(`${apiUrl}/${endpoint}`, { params });
        const responseData = response.data;

        // Cache the response data with the specified TTL
        cache.set(cacheKey, responseData, cacheTTL);

        return responseData;
    } catch (error) {
        throw new Error(`Error fetching data from ${endpoint}: ${error.message}`);
    }
}

async function batchRequest(apiUrl, requests) {
    try {
        const responses = await axios.post(`${apiUrl}/batch`, requests);
        return responses.data;
    } catch (error) {
        throw new Error(`Error making batch request: ${error.message}`);
    }
}

// Function to fetch posts from the API
async function fetchPosts(apiUrl) {
    // Example implementation to fetch posts
    try {
        // Code to make HTTP request and retrieve posts from the API
        const posts = await fetchData(apiUrl, 'posts', {});

        return posts;

        // If the request is successful, return the posts
        // If the request fails, throw an error
    } catch (error) {
        throw new Error('Error fetching posts: Network Error');
    }
}

// Function to fetch users from the API
async function fetchUsers(apiUrl) {
    // Example implementation to fetch users
    try {
        // Code to make HTTP request and retrieve users from the API
        const users = await fetchData(apiUrl, 'users', {});

        return users;
        // If an error occurs during the request, throw an error

    } catch (error) {
        throw new Error('Error fetching users: Network Error');
    }
}

module.exports = {
    fetchData,
    batchRequest,
    fetchPosts,
    fetchUsers
};