//Function to handle fetching of data from the backend API.(FastAPI)
import { get } from '../utils/apiUtils';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const fetchData = async () => 
{
    try
    {
        // Use the apiUtils to make the request
        const data = await get(ENDPOINTS.RESUME_DATA);
        return data;
    }
    catch( error )
    {
        console.error( 'Fetch error:', error );
        throw error;
    }
}