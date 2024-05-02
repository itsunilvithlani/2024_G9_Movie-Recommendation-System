import React from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import PersonDetailsBanner from './personDetailsBanner/PersonDetailsBanner';
import MovieCredits from './knownForCarousels/MovieCredits';
import TvCredits from './knownForCarousels/TvCredits';

const Person = () => {
    const { id } = useParams();
    const {data, loading} = useFetch(`/person/${id}/images`);
    return (
        <div>
            {/* <h1>Person</h1> */}
            <PersonDetailsBanner profile_path={data?.profiles[0]?.file_path}/>
            <MovieCredits id={id}/>
            <TvCredits id={id}/>
        </div>
    );
};

export default Person;