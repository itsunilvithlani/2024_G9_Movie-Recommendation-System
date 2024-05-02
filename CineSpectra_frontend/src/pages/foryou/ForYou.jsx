import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovieRecommendations } from '../../utils/combineApiData';
import Spinner from '../../components/spinner/Spinner';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import MovieCard from '../../components/movieCard/MovieCard';   
import useFetch from '../../hooks/useFetch';
import { fetchDataFromDjango, isSubscribed, postDataIntoDjango } from '../../utils/api';
import { useSelector } from 'react-redux';

const ForYou = () => {
    
    const[dataApi, setDataApi] = useState(null);
    const[loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.home.authReducer.auth);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSubscription = async () => {
            const { is_subscribed } = await isSubscribed();
            if(is_subscribed === false){
                navigate('/subscribe');
            }
        }
        checkSubscription();
        // console.log(is_subscribed);
    }, [])
    
    useEffect(() => {
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
              [array[i], array[j]] = [array[j], array[i]]; // Swap elements at index i and j
            }
            return array;
          }
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const history = await fetchDataFromDjango(`/history/get-history/${user.id}/`);
                let allMovies = [];
                // Use Promise.all to wait for all asynchronous operations to complete
                await Promise.all(
                    history.map(async (item) => {
                        try {
                            const movieDetails = await getMovieRecommendations(item.media_id);
                            movieDetails.data.forEach((movie) => {
                                movieDetails.data.forEach((movie) => {
                                    // Check if the movie's id already exists in allMovies
                                    const exists = allMovies.some(existingMovie => existingMovie.id === movie.id);
                                    if (!exists) {
                                        allMovies.push(movie); // Push the movie to the array if it doesn't exist
                                    }
                                });
                            });
                        } catch (error) {
                            console.log("Movie not in dataset");
                        }
                    })
                );
                // console.log(allMovies);
                setDataApi(shuffleArray(allMovies));
                setLoading(false);
                console.log(dataApi); // Make sure 'dataApi' is defined in your component
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };
    
        fetchMovieDetails();
    
        // Make sure to include 'id' in the dependency array if 'getMovieRecommendations' or 'setDataApi' depends on it
    }, []);

    return (
        <div className='searchResultsPage'>
        {loading && <Spinner initial={true}/>}
        {!loading && (
            <ContentWrapper>
                {dataApi ? (
                <>
                    <div className="pageTitle">
                        For You
                    </div>
                    <div className='content'>
                        {dataApi.map((item, index) => {
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

export default ForYou