import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Index from './page';
import Footer from '@/components/Footer';

function index() {
  const [movies, setMovies] = useState([]);

  const handleMoviesFetched = (fetchedMovies) => {
    setMovies(fetchedMovies);
  };

  return (
    <>
      <div className="index">
        <NavBar onMoviesFetched={handleMoviesFetched} />
        <Index movieResults={movies} />
        <Footer />
      </div>
    </>
  );
}

export default index;