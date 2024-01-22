import { useEffect, useRef, useState, createContext } from 'react'
import './App.css'
import Header from './components/Header';

export const SearchBarContext = createContext({});

function App() {
  const [weatherData, setWeatherData] = useState(undefined);
  const searchBarRefs = {
    country: useRef(),
    city: useRef()
  };
  async function fetchForecast(url) {
    try {
      const promise = await fetch(url);
      const data = await promise.json();
      setWeatherData(() => {
        return {...data};
      });
      }
    catch(error) {
      console.log("Error in fetchForecast: ", error);
    }
  }
  
  async function fetchLocation (url) {
    try {
        const promise = await fetch(url);
        const data = await promise.json();
        const {lat, lon} = data.features[0].properties;
        fetchForecast(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`);
    }
    catch(error) {
        console.log("error in fetchLocation: ", error);
    }
  }

  //DisplayWeather Data
  useEffect(() => {
    console.log("weatherData: ", weatherData);
  }, [weatherData]);

  function getWeatherData() {
    if(!searchBarRefs.country.current || !searchBarRefs.city.current) {
      console.log("Failed");
      return;
    }
    
    const country = encodeURIComponent(searchBarRefs.country.current.value);
    const city = encodeURIComponent(searchBarRefs.city.current.value);

    fetchLocation(`https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20${city}%20W1H%201LJ%2C%20${country}&apiKey=2dafca2a26414552b3f472fefd7a4a52`);
  }

  return (
    <>
      <SearchBarContext.Provider value={searchBarRefs}>
      <Header
      getWeatherData={getWeatherData}/>
      </SearchBarContext.Provider>
    </>
  )
}

export default App
