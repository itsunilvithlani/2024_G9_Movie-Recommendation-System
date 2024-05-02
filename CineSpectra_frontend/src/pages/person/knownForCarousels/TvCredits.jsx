import React from 'react';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const TvCredits = ({id}) => {
    const {data, loading} = useFetch(`/person/${id}/tv_credits`);
    return (
        <Carousel
            title="TV Show Credits"
            data={data?.cast}
            loading={loading}
            endpoint="tv"
        />
    );
};

export default TvCredits;