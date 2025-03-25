//Function to handle fetching of data from the backend API.(FastAPI)

export const fetchData = async () => 
{
    try
    {
        //Make a get request to FastAPI backend
        const response = await fetch( 'http://wwww.semphas.com:8000/' );

        //Check if successful
        if ( !response.ok )
        {
            throw new Error("Connection to API failed.");
        }

        //Parse the JSON data from the response
        const data = await response.json();
        return data;
    }
    catch( error )
    {
        console.error( 'Fetch error:', error );
        throw error;
    }
}