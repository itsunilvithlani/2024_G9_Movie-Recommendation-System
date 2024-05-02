import React, { useEffect, useState } from "react";
import Carousel from "../../../components/carousel/Carousel";

const RecommendationsML = ({ data, loading }) => {

    // console.log(data);
    return (
        <Carousel
                    title="Recommendations using ML"
                    data={data}
                    loading={loading}
                    endpoint='movie'
        />
    );
};

export default RecommendationsML;