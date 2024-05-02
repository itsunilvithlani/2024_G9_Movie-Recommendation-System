import React from 'react'

import Carousel from '../../../components/carousel/Carousel'
import useFetch from '../../../hooks/useFetch'

const ContentBased = ({mediaType, id}) => {

    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/`
    )

    return (
        <Carousel
            title="Content-Based"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    )
}

export default ContentBased