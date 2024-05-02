import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovieRecommendations } from '../../utils/combineApiData';
import Spinner from '../../components/spinner/Spinner';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import useFetch from '../../hooks/useFetch';
import { fetchDataFromDjango, postDataIntoDjango } from '../../utils/api';
import { useSelector } from 'react-redux';

const RecommendedMovies = () => {
    const navigate = useNavigate();
    const { id }= useParams();
    const[dataApi, setDataApi] = useState(null);
    const[loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.home.authReducer.auth);
    
    const {data} = useFetch(`/movie/${id}`);
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const movieDetails = await getMovieRecommendations(id);
                if(movieDetails.length === 0){
                    navigate('/subscribe/');
                }
                setDataApi(movieDetails);
                console.log(movieDetails);
                setLoading(false);
                console.log(dataApi); // Make sure 'dataApi' is defined in your component
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
                // console.log(history);
                
                // console.log(hasDuplicates(history, id, mediaType.toString()));
                if(!hasDuplicates(history, id, 'movie')){
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
                    media_type: 'movie'
                };
                await postDataIntoDjango('/history/add-movie/', body);
                console.log('History added successfully');
            } catch (error) {
                console.error('Error adding history to backend:', error);
            }
        };
        
    
        fetchMovieDetails();

        checkForAlreadyAvailableHistory();
    
        // Make sure to include 'id' in the dependency array if 'getMovieRecommendations' or 'setDataApi' depends on it
    }, [id]);

    return (
        <div className='searchResultsPage'>
        {loading && <Spinner initial={true}/>}
        {!loading && (
            <ContentWrapper>
                {dataApi ? (
                <>
                    <div className="pageTitle">
                    {`Recommendations for ${data?.original_title} using ML`}
                    </div>
                    <div className='content'>
                        {dataApi.data?.map((item, index) => {
                            return (
                            <MovieCard 
                                key={index} 
                                data={item}
                                fromSearch={true}
                                mediaType='movie'/>
                            )
                        })}
                    </div>
                    
                </>
                ) : (
                <span className="resultNotFound">
                    Sorry, Results not found!
                </span>
                )}
            </ContentWrapper>
        )}
      </div>
    )
}

export default RecommendedMovies