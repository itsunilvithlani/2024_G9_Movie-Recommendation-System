import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaHistory, getMovieRecommendations } from '../../utils/combineApiData';
import Spinner from '../../components/spinner/Spinner';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import './styles.scss';
import { deleteFromDjango } from '../../utils/api';

const History = () => {
    const [dataApi, setDataApi] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useSelector((state) => state.home.authReducer.auth.user);    

    useEffect(() => {
        const fetchHistoryList = async () => {
            try {
                setLoading(true);
                const data = await getMediaHistory(id);
                setDataApi(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };
    
        fetchHistoryList();
    
    }, []);

    const clearHistory = async () => {
        try {
            await deleteFromDjango(`/history/clear-history/${id}/`);
            // After clearing history, fetch the updated history
            const updatedData = await getMediaHistory(id);
            setDataApi(updatedData);
        } catch (error) {
            console.error('Error clearing history:', error);
        }
    }

    return (
        <div className='historyPage'>
            {loading && <Spinner initial={true}/>}
            {!loading && (
                <ContentWrapper>
                    {dataApi && dataApi.data.length > 0 ? (
                        <>
                            <div className="history_title">
                                {"History"}
                                
                                <button class="noselect" onClick={clearHistory}>
                                    <span class="text">Clear History</span>
                                    <span class="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                            <div className='content'>
                                {dataApi.data.map((item, index) => (
                                    <MovieCard
                                        key={index} 
                                        data={item}
                                        fromSearch={true}
                                        mediaType='movie'/>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="history_title">{"History"}
                            </div>
                            <div className="emptyHistory">
                                Looks like there's nothing in your watch history right now.
                            </div>
                        </>
                    )}
                </ContentWrapper>
            )}
        </div>
    )
}

export default History;
