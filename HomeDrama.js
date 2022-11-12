import React, { useState, useEffect, component } from "react";
import { ReactDOM } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Slider from "react-slick";
import axios from "axios";
import { API_URL, API_KEY, IMAGE_BASE_URL, DRAMA, ACTION, FANTASY } from "./components/config";
import Drama from "./components/Drama";
import "./Home.css";
import "slick-carousel/slick/slick.css";


function HomeDrama(props) {
    const [dramas, setDrama] = useState([]);
    const [loadMorePage, setLoadMorePage] = useState(0);
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 4000,
        cssEase: "linear",
        pauseOnHover: true
    };
    const cardsettings = {
        dots: false,
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 3
    };




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


    console.log(dramas);


    return (

        <div className="drama">
            <h3 className="todayTop">Drama</h3>
            <button onClick={loadMore}>More</button>
            <Slider {...cardsettings}>
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
            </Slider>
        </div>

    );
}

export default HomeDrama;