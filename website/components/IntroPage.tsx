
import React, { useState, useEffect } from 'react';

const IntroPage = () => {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "Find it difficult to find movies for movie night?",
    "Too many options to choose from?",
    "For the first time, feel free to be picky.",
    "Here is Movie Match."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((currentText) => (currentText + 1) % texts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="intro-page">
      {texts.map((text, index) => (
        <p 
          key={index}
          className={`intro-text ${currentText === index ? 'fade-in' : 'fade-out'}`}
        >
          {text}
        </p>
      ))}
    </div>
  );
};

export default IntroPage;