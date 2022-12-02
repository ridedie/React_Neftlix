import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { API_URL, API_KEY, IMAGE_BASE_URL, ACTION} from "../components/config";
import MovieInfo from '../components/MovieInfo';
import Action from "../components/Action";
import './Detail.css';


function ActionDetail() {
	const { movieId } = useParams();
	const [movies, setMovie] = useState([]);

	const getMovies = async() => {
		const json = await (
			await fetch(
				`${API_URL}/movie/${movieId}?${ACTION}&api_key=${API_KEY}&language=en-US`
			)
		).json();
		setMovie(json)
	};
	useEffect(()=> {
		getMovies();
	}, [])
	

	return (
		<div className="Detail">
			<React.Fragment>
			<Action
			 image={
				movies.poster_path
					? `${IMAGE_BASE_URL}original/${movies.poster_path}`
					: null
			} />
			<MovieInfo
				movie={movies}
			/>
			</React.Fragment>
		</div>
	);
}

export default ActionDetail;