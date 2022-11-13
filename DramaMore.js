import React, { useState, useEffect, component } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL, DRAMA, ACTION, FANTASY } from "./components/config";
import Drama from "./components/Drama";
import axios from "axios";
import "./DramaMore.css";


function DramaMore() {

    const [dramas, setDrama] = useState([]);
    const [loadMorePage, setLoadMorePage] = useState(0);

    useEffect(() => {
        const endpoint = `${API_URL}${DRAMA}&api_key=${API_KEY}&language=en-US`;
        fetchMovies(endpoint)
    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then((response) => response.json())
            .then(response => {
                setDrama([...dramas, ...response.results]);
                setLoadMorePage(response.page)
            });
    }

    const loadMore = () => {

        const endpoint = `${API_URL}${DRAMA}&api_key=${API_KEY}&language=en-US&page=${loadMorePage + 1}`;
        fetchMovies(endpoint)
    }
    return(
        <div className="drama">
        <h1 className="DramaMore">Drama</h1>
        <div className="container">
            {dramas && dramas.map((drama, index) => {
                return (
                    <React.Fragment key={index}>
                        <Drama
                            image={
                                drama.poster_path
                                    ? `${IMAGE_BASE_URL}w500/${drama.poster_path}`
                                    : null
                            }
                            key={drama.id}
                        />
                    </React.Fragment>
                );
            })}
        </div>
        <button onClick={loadMore}>More</button>
    </div>
    )
}

export default DramaMore;