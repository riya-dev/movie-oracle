import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Page from './page';
import Footer from '@/components/Footer';
import IntroPage from '@/components/IntroPage';

function Index() {
  const [movies, setMovies] = useState([]);

  const handleMoviesFetched = (fetchedMovies:any) => {
    setMovies(fetchedMovies);
  };

  return (
    <>
      <div className="index">
        {/* <IntroPage /> */}
        <NavBar onMoviesFetched={handleMoviesFetched} />
        <Page movieResults={movies} />
        <Footer />
      </div>
    </>
  );
}

export default Index;