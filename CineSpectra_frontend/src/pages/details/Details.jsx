import React, { useEffect, useState } from 'react';
import "./style.scss";
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideosSection from './videosSection/VideosSection';
import Recommendation from './carousels/Recommendation';
import Similar from './carousels/Similar';
import RecommendationsML from './carousels/RecommendationsML';
import { getMovieRecommendations } from '../../utils/combineApiData';
import { fetchDataFromDjango, postDataIntoDjango } from '../../utils/api';
import { useSelector } from 'react-redux';


const Details = () => {
    const { mediaType, id } = useParams();
    const {data, loading} = useFetch(`/${mediaType}/${id}/videos`);
    const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`);
    const [dataApi, setDataApi] = useState(null);
    const [loadingML, setLoading] = useState(false);
    const { user } = useSelector((state) => state.home.authReducer.auth);
    // console.log(user.id);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const movieDetails = await getMovieRecommendations(id);
                setDataApi(movieDetails);
                setLoading(false);
                // console.log(dataApi); // Make sure 'dataApi' is defined in your component
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        function hasDuplicates(jsonArray, media_id, type) {
            const duplicates = jsonArray.filter(obj => obj.media_id == media_id && obj.media_type === type);
            return duplicates.length > 0;
        }

        const checkForAlreadyAvailableHistory = async () => {
            try{
                const history = await fetchDataFromDjango(`/history/get-history/${user.id}/`);
                // console.log(id);
                
                // console.log(hasDuplicates(history, id, mediaType.toString()));
                if(!hasDuplicates(history, id, mediaType.toString())){
                    storeHistory();
                }
            } catch(error){
                console.error("Unable to fetch history from backend");
            }
        }

        const storeHistory = async () => {
            try {
                const body = {
                    user: user.id.toString(),
                    media_id: id,
                    media_type: mediaType
                };
                await postDataIntoDjango('/history/add-movie/', body);
                console.log('History added successfully');
            } catch (error) {
                console.error('Error adding history to backend:', error);
            }
        };
        
    
        if(mediaType === "movie"){
            fetchMovieDetails();
        }
        
        checkForAlreadyAvailableHistory();
        

        //storeHistory();
    
        // Make sure to include 'id' in the dependency array if 'getMovieRecommendations' or 'setDataApi' depends on it
    }, [id]);

    return (
        <div>
            {/* {console.log(dataApi?.data)} */}
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
            <Cast data={credits?.cast} loading={creditsLoading}/>
            <VideosSection data={data} loading={loading}/>
            {dataApi ? (<RecommendationsML data={dataApi?.data} loading={loadingML}/>) : (<Recommendation mediaType={mediaType} id={id}/>)}
            <Similar mediaType={mediaType} id={id}/>
            
        </div>
    )
};

export default Details;