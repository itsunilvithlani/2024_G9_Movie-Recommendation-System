import React from 'react';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const MovieCredits = ({id}) => {
    const {data, loading} = useFetch(`/person/${id}/movie_credits`);
    return (
        <Carousel
            title="Movie Credits"
            data={data?.cast}
            loading={loading}
            endpoint="movie"
        />
    );
};

export default MovieCredits;