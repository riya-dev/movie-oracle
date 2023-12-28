// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

// export default function Home() {
//   return (
//     <>
//       <div>Hello World</div>
//     </>
//   )
// }

import React, { useEffect, useState } from "react";

function index() {

  const[message, setMessage] = useState("Loading");
  const [people, setPeople] = useState([]);

  useEffect(() => {
    // fetch API
    fetch("http://localhost:8080/api/home")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // message initially set to 'Loading'.
      // once data is retrived, message is set to data.message
      setMessage(data.message);
      // console.log(people);
      setPeople(data.people);
    });
  }, [])

  return (
    <div>
      <div>{message}</div>
      {people.map((person, index) =>
        <div key={index}>{person}</div>
      )}
    </div>
  )
}

export default index