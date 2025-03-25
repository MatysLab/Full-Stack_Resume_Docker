/**
 * API utility functions for making HTTP requests
 */
import { API_BASE_URL, ENDPOINTS } from '../constants/apiEndpoints';

/**
 * Generic fetch function with error handling
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise} - Response data or error
 */
export const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * GET request helper
 * @param {string} endpoint - API endpoint
 * @returns {Promise} - Response data
 */
export const get = (endpoint) => {
  return fetchWithErrorHandling(endpoint);
};

/**
 * POST request helper
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request payload
 * @returns {Promise} - Response data
 */
export const post = (endpoint, data) => {
  return fetchWithErrorHandling(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * PUT request helper
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request payload
 * @returns {Promise} - Response data
 */
export const put = (endpoint, data) => {
  return fetchWithErrorHandling(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * DELETE request helper
 * @param {string} endpoint - API endpoint
 * @returns {Promise} - Response data
 */
export const del = (endpoint) => {
  return fetchWithErrorHandling(endpoint, {
    method: 'DELETE',
  });
};