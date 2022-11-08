import React, { useState, useEffect } from "react";
import { ReactDOM } from "react";
import Slider from "react-slick";
import axios from "axios";
import Movie from "./components/Movie";
import { API_URL, API_key, IMAGE_BASE_URL } from "./components/config";
import Banner from "./components/Banner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function MovieApi(props) {
	const [movies, setMovies] = useState(null);
	const [mainMovieImg, setMainMovieImg] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 3
	  };

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				// 요청이 시작 할 때에는 error 와 movies 를 초기화하고
				setError(null);
				setMovies(null);
				// loading 상태를 true 로 바꿉니다.
				setLoading(true);
				const response = await axios.get(
					`${API_URL}/movie/popular?api_key=${API_key}&language=en-US&page=1`
				);
				setMovies(response.data);
				setMainMovieImg(setMainMovieImg || response.results[0]);
			} catch (e) {
				setError(e);
			}
			setLoading(false);
		};

		fetchUsers();
	}, []);

	if (loading) return <div>로딩중..</div>;
	if (error) return <div>에러가 발생했습니다</div>;
	if (!movies) return null;
	
	return (
		<div>
			<div>
			<Slider {...settings}>
				{movies.results.map((banner) => {
					return (
						<Banner
							image={
								banner.poster_path
									? `${IMAGE_BASE_URL}w500/${banner.backdrop_path}`
									: null
							}
							key={banner.id}
							title={banner.title}
							text={banner.overview}
						/>
					);
				})}
				</Slider>
			</div>

			
			<div>
			<Slider {...settings}>
				{movies.results.map((movie) => {
					return (
						<Movie
							image={
								movie.poster_path
									? `${IMAGE_BASE_URL}w500/${movie.poster_path}`
									: null
							}
							key={movie.id}
							title={movie.title}
							overview={movie.overview}
						/>
					);
				})}
				</Slider>
			</div>
			
		</div>
	);
}

export default MovieApi;
