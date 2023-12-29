import { useState, useEffect } from 'react';

const NavBar = () => {
  const [showAdultContent, setShowAdultContent] = useState(false);
  const [genreSearch, setGenreSearch] = useState('');

  const handleToggleAdultContent = () => {
    setShowAdultContent(!showAdultContent);
  };

  const handleGenreSearchChange = (e) => {
    setGenreSearch(e.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for genre:', genreSearch);
  };

  return (
    <>
      <div className="navbar">
        <button className="btn" onClick={handleToggleAdultContent}>
          {showAdultContent ? 'No Adult Content' : 'Show Adult Content'}
        </button>
        <input
          type="text"
          placeholder="Search by genre"
          className='search-bar'
          value={genreSearch}
          onChange={handleGenreSearchChange}
        />
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