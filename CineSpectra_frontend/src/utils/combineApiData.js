import useFetchDjango from "../hooks/useFetchDjango";
import useFetch from "../hooks/useFetch";
import { fetchDataFromApi, fetchDataFromDjango, fetchDataFromDjangoAuthenticated, postDataIntoDjango } from "./api";
import axios, { AxiosError } from "axios";

export async function getMovieRecommendations(movie_id) {
    try {
        let data = [];
        const movie_ids = await fetchDataFromDjangoAuthenticated(`/movies/recommend-movie/${movie_id}/`);
        // console.log(movie_ids.message);
        if(movie_ids.name === "AxiosError"){
            return;
        }
        if(movie_ids.length == 0){
            return [];
        }
        const promises = movie_ids.map(async (item) => {
            const movie_data = await fetchDataFromApi(`/movie/${item.movie_id}`);
            data = [...data, movie_data];
        });

        await Promise.all(promises);
        // console.log(data);
        return { data };
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function getMediaHistory(user_id) {
    try {
        let data = [];
        let movie_ids = await fetchDataFromDjango(`/history/get-history/${user_id}/`);
        console.log(movie_ids);
        if(movie_ids.name === "AxiosError"){
            return;
        }

        movie_ids.reverse();
        const promises = movie_ids.map(async (item) => {
            const movie_data = await fetchDataFromApi(`/${item.media_type}/${item.media_id}`);
            data = [...data, movie_data];
        });

        await Promise.all(promises);
        console.log(data);
        return { data };
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const fetchMovieList = async () => {
    let options = [];
    const movieJSON = await fetchDataFromDjango(`/movies/`);
    movieJSON.map((item) => {
        const new_item = {
            value: item.movie_id,
            label: item.title,
        }
        options = [...options, new_item];
    })

    return { options };
}