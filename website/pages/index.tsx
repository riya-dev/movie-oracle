import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Index from './page';

function index() {
  const [movies, setMovies] = useState([]);

  const handleMoviesFetched = (fetchedMovies) => {
    setMovies(fetchedMovies);
  };

  return (
    <>
      <NavBar onMoviesFetched={handleMoviesFetched} />
      <Index movieResults={movies} />
    </>
  );
}

export default index;