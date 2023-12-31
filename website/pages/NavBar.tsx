import { useState, useEffect } from 'react';

const NavBar = () => {
  const [navbarHeight, setNavbarHeight] = useState('100vh');

  const [showAdultContent, setShowAdultContent] = useState(false);
  const [genreSearch, setGenreSearch] = useState('');
  const [sliderValue, setSliderValue] = useState(7);

  const handleToggleAdultContent = () => {
    setShowAdultContent(!showAdultContent);
  };

  const handleGenreSearchChange = (e) => {
    setGenreSearch(e.target.value);
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // prevent default form submission behavior
    setNavbarHeight('10vh');
    console.log('Form Submitted. Values:', { showAdultContent, genreSearch, sliderValue });

    const formData = {
      include_adult: showAdultContent,
      vote_average_gte: sliderValue,
      genre_strings: genreSearch.split(',').map(s => s.trim())
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
    } catch (error) {
      console.error('Error during data fetching:', error);
    }
  };

  return (
    <>
      <div className="navbar" style={{ height: navbarHeight }}>
        <form onSubmit={handleSearch} className="form-container">
          <div className="form-item">
            <button type="button" className="btn-adult" onClick={handleToggleAdultContent}>
              {showAdultContent ? 'No Adult Content' : 'Show Adult Content'}
            </button>
          </div>

          <div className="form-item">
            <input
              type="text"
              placeholder="Search by genre"
              className='search-bar'
              value={genreSearch}
              name="genre"
              onChange={handleGenreSearchChange}
            />
          </div>

          <h2>Minimum rating:</h2>
          <div className="form-item">
            <div className='slider'>
              <label htmlFor="minRating">{sliderValue}</label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={sliderValue}
                name="minRating"
                id="minRating"
                onChange={handleSliderChange}
              />
            </div>
          </div>

          <div className="form-item">
            <button type="submit" className="btn">
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NavBar;