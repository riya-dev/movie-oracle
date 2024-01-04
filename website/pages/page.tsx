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
    	<div className="card-container">
			{/* {movieResults.length > 0 ? ( */}
			<h2 className="h2-alt">Movies for you</h2>
			{movieResults.map((movieResult, index) => (
				<div className="card" key={index}>
				<div className="card-text">
					<h1 className="card-title">{movieResult.title}</h1>
					<p className="card-overview">{movieResult.overview}</p>
					<p className="card-info">
						<strong> Language: {movieResult.original_language}</strong> ● 
						<strong> {movieResult.release_date}</strong>  ● 
						<strong> {movieResult.adult ? 'Adult' : 'Not Adult'}</strong> ● 
						<strong> {movieResult.vote_average} / 10 </strong> <br />
						{/* <strong>Genres:</strong> {movieResult.genre_ids.join(', ')}<br /> */}
					</p>
				
					<p className="card-info">
						<strong>Sound interesting?</strong>
					</p>
					<button type="button" className="shiny-result-button">
						See more
					</button>
				</div>
				
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
    </div>
  )
}

export default page