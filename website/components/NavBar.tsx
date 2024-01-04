import { useState, useEffect } from 'react';

const NavBar = ({ onMoviesFetched }) => {
  const [navbarHeight, setNavbarHeight] = useState('100vh');
  const [showAdultContent, setShowAdultContent] = useState(false);
  const [genreSearch, setGenreSearch] = useState('');
  const [ratingSliderValue, setRatingSliderValue] = useState(7);
  const [runtimeSliderValue, setRuntimeSliderValue] = useState(180);
  const [releaseMin, setReleaseMin] = useState('');
  const [releaseMax, setReleaseMax] = useState('');

  const [isTransformed, setIsTransformed] = useState(false);

  const handleToggleAdultContent = () => {
    setShowAdultContent(!showAdultContent);
  };

  const handleGenreSearchChange = (e) => {
    setGenreSearch(e.target.value);
  };

  const handleRatingSliderChange = (e) => {
    setRatingSliderValue(e.target.value);
  };

  const handleRuntimeSliderChange = (e) => {
    setRuntimeSliderValue(e.target.value);
  };

  const handleReleaseMinSearchChange = (e) => {
    setReleaseMin(e.target.value);
  };

  const handleReleaseMaxSearchChange = (e) => {
    setReleaseMax(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setNavbarHeight('15vh');
    setIsTransformed(true);
    console.log('Form Submitted. Values:', { showAdultContent, genreSearch, 
      ratingSliderValue, runtimeSliderValue, releaseMin, releaseMax
      
    });

    const formData = {
      include_adult: showAdultContent,
      vote_average_gte: ratingSliderValue,
      genre_strings: genreSearch.split(',').map(s => s.trim()),
      runtime_lte: runtimeSliderValue,
      primary_release_date_gte: releaseMin || '2000',
      primary_release_date_lte: releaseMax || '2024',
    };

    try {
      const response = await fetch('http://localhost:8080/api/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log("Received response:", result);
      console.log(result);
      onMoviesFetched(result);
    } catch (error) {
      console.error('Error during data fetching:', error);
    }
  };

  return (
    <>
      <div className="navbar" style={{ height: navbarHeight }}>
        <form onSubmit={handleSearch} className={`form-container ${isTransformed ? 'transformed' : ''}`}>
          <a href="#">
            <h1 className={`h1 ${isTransformed ? 'transformed' : ''}`}>Movie Match</h1>
          </a>
          <div className="form-item">
            <button type="button" className={`shiny-button ${isTransformed ? 'transformed' : ''}`} onClick={handleToggleAdultContent}>
              {showAdultContent ? 'Showing Adult Content' : 'Hiding Adult Content'}
            </button>
          </div>

          <div className="form-item">
            <input
              type="text"
              placeholder= {isTransformed ? "Search by genre..." : "Search by genre... (ex. romance, horror)"}
              className={`search-bar-genre ${isTransformed ? 'transformed' : ''}`}
              value={genreSearch}
              name="genre"
              onChange={handleGenreSearchChange}
            />
          </div>

          
          <div className="form-item">
            <h2 className="h2-navbar">Minimum rating</h2>
            <div className='slider'>
              <label htmlFor="minRating">{ratingSliderValue} / 10</label>
              <input
                type="range"
                className={`slider ${isTransformed ? 'transformed' : ''}`}
                min="0"
                max="10"
                step="0.5"
                value={ratingSliderValue}
                name="minRating"
                id="minRating"
                onChange={handleRatingSliderChange}
              />
            </div>
          </div>

          <div className="form-item">
            <h2 className="h2-navbar">Maximum runtime</h2>
            <div className='slider'>
              <label htmlFor="maxRuntime">{runtimeSliderValue} minutes</label>
              <input
                type="range"
                className={`slider ${isTransformed ? 'transformed' : ''}`}
                min="15"
                max="600"
                step="5"
                value={runtimeSliderValue}
                name="maxRuntime"
                id="maxRuntime"
                onChange={handleRuntimeSliderChange}
              />
            </div>
          </div>

          <div className="form-double">
            <div>
              <h2 className="h2-navbar">
                {isTransformed ? "Oldest" : "Oldest year"}
              </h2>
              <input
                type="text"
                placeholder= "2020"
                className={`search-bar-year ${isTransformed ? 'transformed' : ''}`}
                value={releaseMin}
                name="min-year"
                onChange={handleReleaseMinSearchChange}
              />
            </div>

            <div>
              <h2 className="h2-navbar">
                {isTransformed ? "Latest" : "Latest year"}
              </h2>
              <input
                type="text"
                placeholder= "2024"
                className={`search-bar-year ${isTransformed ? 'transformed' : ''}`}
                value={releaseMax}
                name="max-year"
                onChange={handleReleaseMaxSearchChange}
              />
            </div>
          </div>

          <div className="form-item">
            <button type="submit"
              className={`shiny-search-button ${isTransformed ? 'transformed' : ''}`}>
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NavBar;