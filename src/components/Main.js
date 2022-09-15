import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import axios from "axios";
import Pagination from "./Pagination";

function Main() {

  var genreOptions = ["Comedy",
  "Sci-Fi",
  "Horror",
  "Romance",
  "Action",
  "Thriller",
  "Drama",
  "Mystery",
  "Crime",
  "Animation",
  "Adventure",
  "Fantasy",
  "Comedy-Romance",
  "Action-Comedy",
  "Superhero"
]

  const ytsApi = {
  baseUrl: 'https://yts.mx' //this api does not require an api key.
};

    var moviesList = "";
    const [movies, setMovies] = useState([]);
    const [movieCount, setMovieCount] = useState([]);
    const moviesPerPage = 20
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState({
        genre: "",
        minimum_rating: "",
    })

    function fetchData() {
      axios({
        method: 'GET',
        url: `${ytsApi.baseUrl}/api/v2/list_movies.json`,
        params: {
            genre: data.genre,
            minimum_rating: parseInt(data.minimum_rating),
            page: currentPage,
            limit: moviesPerPage
        }
    }).then(function (response) {
        moviesList = response.data.data.movies;
        console.log(moviesList);
        setMovieCount(response.data.data.movie_count);
        setMovies(moviesList);
    }).catch(function (error) {
        console.log(error);
    });
    }

    function handleSubmit(e) {
      fetchData();
        e.preventDefault();
    }

    useEffect(() => {
      fetchData()
    }, [currentPage]);

    function handleChange(e) {
        const newData = {...data};
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    const paginate = (pageNumber) => {
      if(pageNumber === 0) {
        setCurrentPage(1);
      } else {
        setCurrentPage(pageNumber);
      }
      
    };
    
    return(
      <div>
        <header>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="w3-row-padding" id="movie-search-form">
            <select onChange={(e) => handleChange(e)} value={data.genre} id="genre" className="w3-select w3-round filter-dropdown"
              name="genre">
              <option value="" disabled >Choose a genre</option>
              {genreOptions.map((genreOption, i) => (
              <option key={i} value={genreOption}>{genreOption}</option>
              ))}
            </select>
            <select onChange={(e) => handleChange(e)} value={data.minimum_rating} id="minimum_rating" className="w3-select w3-round filter-dropdown"
              name="minimum_rating">
              <option value="" disabled >Minimum Rating</option>
              {Array.from(Array(10), (e, i) => {
              return <option key={i} value={i}>{i} +</option>
              })}
            </select>
            <input className="w3-btn w3-round" id="search-btn" type="submit" value="Search" />
          </div>
        </form>
      </header>
      <div className="movie-container">
      {movies.map((movie) => (
      <Movie key={movie.id} {...movie} />
      ))}
      </div>
      <Pagination moviesPerPage={moviesPerPage} totalMovies={movieCount} currentPage={currentPage} paginate={paginate} />
      </div>
        
    );
}

export default Main;