import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Index from './page';

function index() {
  const [movies, setMovies] = useState([]); // state to store fetched movies

  const handleMoviesFetched = (fetchedMovies) => {
    setMovies(fetchedMovies); // update state when movies are fetched
  };

  return (
    <>
      <NavBar onMoviesFetched={handleMoviesFetched} />
      <Index movieResults={movies} /> // pass the movies state as a prop to Index
    </>
  );
}

export default index;