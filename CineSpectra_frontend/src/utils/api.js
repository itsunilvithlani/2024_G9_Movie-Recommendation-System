import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
const DJANGO_API_URL = import.meta.env.VITE_API_URL;
const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const {data} = await axios.get(BASE_URL + url,{
            headers,
            params
        })
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const fetchDataFromDjangoAuthenticated = async (url) => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${localStorage.getItem('access')}`,
                'Accept' : 'application/json'
            }
        };

        try {
            const { data } = await axios.get(DJANGO_API_URL + url, config);
            return data
        }

        catch (error) {
            console.error("Movie not found in ML Dataset");
            return error;
        }
    }
}

export const fetchDataFromDjango = async (url) => {
    try {
        const { data } = await axios.get(DJANGO_API_URL + url);
        return data;
    } catch (error) {
        console.error("Movie not found in ML Dataset");
        return error;
    }
}

export const postDataIntoDjango = async (url, body) => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${localStorage.getItem('access')}`,
                'Accept' : 'application/json'
            }
        };

        try {
            console.log(body);
            const res = await axios.post(DJANGO_API_URL + url, JSON.stringify(body), config);
            if (res.status === 201) {
                console.log("Data successfully posted to backend");
                // You can perform further actions here if needed
            } else {
                console.error("Failed to post data to backend");
            }
        } catch (err) {
            if (err.response) {
                // The request was made and the server responded with a status code
                console.error("Server responded with error:", err.response.data);
            } else if (err.request) {
                // The request was made but no response was received
                console.error("No response received:", err.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error("Error setting up request:", err.message);
            }
        }   
    }
}

export const isSubscribed = async () => {
    const response = await fetchDataFromDjangoAuthenticated('/razorpay/user/is_subscribed/');
    return response;
}

export const deleteFromDjango = async (url) => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${localStorage.getItem('access')}`,
                'Accept' : 'application/json'
            }
        };

        try {
            const res = await axios.delete(DJANGO_API_URL + url, config);
            console.log(res);
        } catch (error) {
            console.log(error.message);
        }
    }
}