import React, { useEffect, useState } from "react";
// import { Montserrat } from 'next/font/google'
// const montserrat = Montserrat({ subsets: ['latin'] })

function page({ movieResults }) {
  // const[message, setMessage] = useState("Loading");
  // const [movieResults, setMovieResults] = useState([]);

  // useEffect(() => {
  //   // fetch API
  //   fetch("http://localhost:8080/api/home")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // console.log(data);
  //     // message initially set to 'Loading'.
  //     // once data is retrived, message is set to data.message
  //     // setMessage(data.message);
  //     // console.log(people);
  //     setMovieResults(data);
  //   });
  // }, [])

  return (
    <div>
      <h2 className="h2-alt">Movies for you</h2>
      {movieResults.map((movieResult, index) => (
        <div className="card" key={index}>
          <h1 className="card-title">{movieResult.original_title}</h1>
          <strong>Language:</strong> {movieResult.original_language} <br />
          {/* <strong>Overview:</strong> {movieResult.overview} <br /> */}
          {movieResult.overview} <br />
          <strong>Release Date:</strong> {movieResult.release_date} <br />
          <strong>Adult:</strong> {movieResult.adult ? 'Yes' : 'No'} <br />
          <strong>Rating:</strong> {movieResult.vote_average} / 10 <br />
          {movieResult.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${movieResult.poster_path}`}
              alt={`Poster for ${movieResult.original_title}`}
              className="poster-image"
              draggable="false"
              style={{ width: '20%', height: 'auto' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default page