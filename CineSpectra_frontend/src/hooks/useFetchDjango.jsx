import { useEffect, useState } from "react";
import { fetchDataFromDjango } from "../utils/api";
const useFetchDjango = (url) => {
    const [data_api, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading("loading...");
        setData(null);
        setError(null);

        fetchDataFromDjango(url)
            .then((res) => {
                setLoading(false);
                setData(res);
            })
            .catch((err) => {
                setLoading(false);
                setError("Something went wrong!");
            });
    }, [url]);

    return { data_api, loading, error };
};

export default useFetchDjango;