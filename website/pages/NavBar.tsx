import { useState, useEffect } from 'react';

const NavBar = () => {
  const [showAdultContent, setShowAdultContent] = useState(false);
  const [genreSearch, setGenreSearch] = useState('');
  const [sliderValue, setSliderValue] = useState(50);

  const handleToggleAdultContent = () => {
    setShowAdultContent(!showAdultContent);
  };

  const handleGenreSearchChange = (e) => {
    setGenreSearch(e.target.value);
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for genre:', genreSearch);
  };

  return (
    <>
      <div className="navbar">
        <button className="btn-adult" onClick={handleToggleAdultContent}>
          {showAdultContent ? 'No Adult Content' : 'Show Adult Content'}
        </button>
        <input
          type="text"
          placeholder="Search by genre"
          className='search-bar'
          value={genreSearch}
          onChange={handleGenreSearchChange}
        />

        <h2>Minimum rating: </h2>
        <div className='slider'>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={sliderValue}
            onChange={handleSliderChange}
          />
          <label htmlFor="slider">{sliderValue}</label>
        </div>
        <button className="btn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </>
  );
};

export default NavBar;

/*
const sendDataToFlask = async () => {
    const data = { key: 'value' }; // Your data object
    const response = await fetch('http://localhost:5000/submit_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
};
*/