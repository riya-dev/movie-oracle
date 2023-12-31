// export default function Home() {
//   return (
//     <>
//       <div>Hello World</div>
//     </>
//   )
// }

import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from "react";
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

function index() {

  // const[message, setMessage] = useState("Loading");
  const [movieResults, setMovieResults] = useState([]);

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
      <h1>Movies for you</h1>
      {movieResults.map((movieResult, index) => (
        <div className="card" key={index}>
          <h1 className="card-title">{movieResult.original_title}</h1>
          <strong>Language:</strong> {movieResult.original_language} <br />
          <strong>Overview:</strong> {movieResult.overview} <br />
          <strong>Release Date:</strong> {movieResult.release_date} <br />
          <strong>Adult:</strong> {movieResult.adult ? 'Yes' : 'No'} <br />
          {movieResult.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${movieResult.poster_path}`}
              alt={`Poster for ${movieResult.original_title}`}
              className="poster-image"
              draggable="false"
              style={{ width: '15%', height: 'auto' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default index