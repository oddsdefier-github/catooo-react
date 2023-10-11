import React, { useState, useEffect } from 'react';
import './tailwind.css';
import catIcon from './cat.png';

const API_KEY = 'live_VYWieMaZM9uyeWnhAESDEKF6KvxyVtOYstsBmZxeJZv4MQO2n0Ea2Wdy0adkfexM';
const BASE_URL = 'https://api.thecatapi.com/v1';

function App() {
  const [catImages, setCatImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasFetchedInitially, setHasFetchedInitially] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (!hasFetchedInitially) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasFetchedInitially]);


  useEffect(() => {
    const storedUrl = localStorage.getItem('catImageUrl');
    if (storedUrl) {
      setCatImages([storedUrl]);
      setLoading(false);
    } else {
      fetchCatImages();
    }
  }, []);

  const fetchCatImages = async () => {
    try {
      const response = await fetch(`${BASE_URL}/images/search?limit=10`, {
        headers: {
          'x-api-key': API_KEY
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const urls = data.map(img => img.url);
      setCatImages(urls);
      setLoading(false);
      setHasFetchedInitially(true);
    } catch (error) {
      console.error('Error fetching cat data:', error);
      setLoading(false);
    }
  };

  const showNextCatImage = () => {
    if (currentImageIndex >= catImages.length - 1) {
      setCurrentImageIndex(0);
      fetchCatImages();
      return;
    }

    const url = catImages[currentImageIndex];
    localStorage.setItem('catImageUrl', url);
    setCurrentImageIndex(prevIndex => prevIndex + 1);
  };

  return (
    <main className="h-screen px-5 w-screen font-inter" style={{ backgroundColor: '#181b20' }}>
      <Header />
      {showWelcome && loading && !hasFetchedInitially ? <WelcomeContainer /> : null}
      {loading && hasFetchedInitially ? <Loading /> : null}
      {!loading ? <CatImage url={catImages[currentImageIndex]} /> : null}
      <FetchButton showNextCatImage={showNextCatImage} />
    </main>
  );
}

function Header() {
  return (
    <header className="h-[10%] w-screen flex justify-between items-center">
      <h1 className="font-bold text-2xl lg:text-5xl" style={{ color: '#39FF14' }}>
        catooo
        <span className="text-4xl font-extrabold text-indigo-600">.</span>
      </h1>
    </header>
  );
}

function Loading() {
  return (
    <section className="h-[70%] w-full grid place-items-center">
      <div role="status" className="loading w-72 animate-pulse">
        {<svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>}
      </div>
    </section>
  );
}

function CatImage({ url }) {
  return (
    <section className="h-[70%] w-full grid place-items-center relative">
      <div className="relative">
        <a
          href={url}
          rel="noreferrer"
          target='_blank'
          download
          className="absolute top-0 right-0 rounded-tr-lg p-2 rounded-bl-lg hover:bg-indigo-600 transition duration-200"
          title="Download Image"
        >
          {<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="stroke-white w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>}
        </a>
        <div className="max-w-sm bg-transparent">
          <img className="cat-img rounded-t-lg" src={url} alt="Random Cat" />
        </div>
      </div>
    </section>
  );
}


function WelcomeContainer() {
  return (
    <section className="h-[70%] w-full grid place-items-center animate-pulse">
      <div className="welcome-container w-72">
        <div className="max-w-sm flex flex-col justify-center items-center gap-2 h-72">
          <h1 className="text-8xl font-bold leading-3 text-indigo-600">
            random cat
            <span className="text-pink-500 text-9xl">.</span>
          </h1>
          <h5 className="text-gray-600 text-sm">
            © jeffry-paner 2023
          </h5>
        </div>
      </div>
    </section>
  );
}

function FetchButton({ showNextCatImage }) {
  return (
    <section className="h-[20%] z-10">
      <div className="w-screen grid place-items-center">
        <button
          onClick={() => {
            localStorage.clear();
            showNextCatImage();
          }}
          className="overflow-clip rounded-full active:scale-110 transition-all duration-300 ease-in-out hover:bg-gray-100 focus:ring focus:ring-gray-200 bg-white shadow-lg p-2"
        >
          {<img className="cat-icon w-9 h-9 rounded-full pointer-events-none" src={catIcon} alt="cat-icon" />}
        </button>
      </div>
    </section>
  );
}


export default App;
