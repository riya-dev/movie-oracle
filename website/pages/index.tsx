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
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

function index() {

  // const[message, setMessage] = useState("Loading");
  const [movieResults, setMovieResults] = useState([]);

  useEffect(() => {
    // fetch API
    fetch("http://localhost:8080/api/home")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // message initially set to 'Loading'.
      // once data is retrived, message is set to data.message
      // setMessage(data.message);
      // console.log(people);
      setMovieResults(data.movie_results);
    });
  }, [])

  return (
    <div>
      {movieResults.map((movieResult, index) => (
        <div key={index}>
          <strong>Title:</strong> {movieResult.original_title} <br />
          <strong>Language:</strong> {movieResult.original_language} <br />
          <strong>Overview:</strong> {movieResult.overview} <br />
          <strong>Release Date:</strong> {movieResult.release_date} <br />
          <strong>Adult:</strong> {movieResult.adult ? 'Yes' : 'No'} <br />
          <hr />
        </div>
      ))}
    </div>
  )
}

export default index