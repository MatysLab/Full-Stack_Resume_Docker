/**
 * Custom hook for API data fetching
 */
import { useState, useEffect } from 'react';
import { get, post, put, del } from '../utils/apiUtils';

/**
 * Hook for fetching data from an API endpoint
 * @param {string} endpoint - The API endpoint to fetch data from
 * @param {Object} options - Additional options for the fetch request
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useFetch = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await get(endpoint);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.skipInitialFetch) return;
    fetchData();
  }, [endpoint]);

  return { data, loading, error, refetch: fetchData };
};

/**
 * Hook for submitting data to an API endpoint
 * @param {string} endpoint - The API endpoint to submit data to
 * @param {string} method - The HTTP method to use (post, put, delete)
 * @returns {Object} - { submit, loading, error, data }
 */
export const useSubmit = (endpoint, method = 'post') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      
      let result;
      switch (method.toLowerCase()) {
        case 'post':
          result = await post(endpoint, payload);
          break;
        case 'put':
          result = await put(endpoint, payload);
          break;
        case 'delete':
          result = await del(endpoint);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, data };
};