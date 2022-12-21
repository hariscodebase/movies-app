import React from "react" ;

const Movie = ({ title_long, title_english, large_cover_image, summary, rating, genres, yt_trailer_code }) =>  
<div className="movie">
    <img src={large_cover_image} alt={title_english} ></img>
    <div className="movie-info">
        <h3>{title_long}</h3>
        <span>{rating}</span>
    </div>
    <div className="movie-over">
        <h3>{title_long}</h3>
        <ul className="genreList">
        {genres.map((genre) => (
            <li key={genre} className="genreListItem">{genre}</li>
        ))}
        </ul>
        <a className="w3-btn w3-round watch-trailer-link" target="_blank" href={ yt_trailer_code ? "https://www.youtube.com/watch?v="+yt_trailer_code : "https://www.youtube.com/"}>Watch Trailer</a>
        <h3>Summary: </h3>
        <p>{summary}</p>
    </div>
</div>



export default Movie;