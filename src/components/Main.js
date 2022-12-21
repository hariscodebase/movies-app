import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import axios from "axios";
import Pagination from "./Pagination";


function Main() {
  
  var genreOptions = ["--Any--",
  "Comedy",
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
        genre: "--Any--",
        minimum_rating: "7",
    })

    

    function fetchData() {
      axios({
        method: 'GET',
        url: `${ytsApi.baseUrl}/api/v2/list_movies.json`,
        params: {
            genre: data.genre === "--Any--" ? "" : data.genre,
            minimum_rating: parseInt(data.minimum_rating),
            page: currentPage,
            limit: moviesPerPage
        }
    }).then(function (response) {
        moviesList = response.data.data.movies;
        setMovieCount(response.data.data.movie_count);
        setMovies(moviesList);
    }).catch(function (error) {
        console.log(error);
    });
    }

    function handleSubmit(e) {
      setCurrentPage(1);
      fetchData();
        e.preventDefault();
    }

    useEffect(() => {
      fetchData();
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
           <div className="logo-div">
              <a className="mg-logo-link" href=".">
                <object className="mg-logo-svg" aria-label="logo" data="logo.svg" width="200"></object>
              </a>           
            </div>
            <div className="search-div"> 
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
            
          </div>
        </form>
      </header>

      {movies ? 
      <div className="movie-container">
      {movies.map((movie) => (
      <Movie key={movie.id} {...movie} />
      ))}
      </div>
     : <p className="error-msg">Oops! no movies found</p>  
    }

<Pagination moviesPerPage={moviesPerPage} totalMovies={movieCount} currentPage={currentPage} paginate={paginate} />

      
      </div>
        
    );
}

export default Main;