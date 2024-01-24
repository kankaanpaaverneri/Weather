import { useEffect, useRef, useState, createContext } from 'react'
import './App.css'
import Header from './components/Header';
import WeatherResults from './components/WeatherResults';
import InitialDisplay from './components/InitialDisplay';
import ErrorDisplay from './components/ErrorDisplay';

export const SearchBarContext = createContext({});

function App() {
  const [weatherData, setWeatherData] = useState(undefined);
  const [temperatures, setTemperatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);

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
      setLoading(() => false);
      setErrorDisplay(() => true);
      setTemperatures(() => []);
      console.log("Error in fetchForecast: ", error);
    }
  }
  
  async function fetchLocation (url) {
    try {
        setLoading(() => true);
        const promise = await fetch(url);
        const data = await promise.json();
        console.log(data);
        const {lat, lon} = data.features[0].properties;
        fetchForecast(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`);
    }
    catch(error) {
        setLoading(() => false);
        setErrorDisplay(() => true);
        setTemperatures(() => []);
        console.log("error in fetchLocation: ", error);
    }
  }
  //DisplayWeather Data
  useEffect(() => {
    console.log("weatherData: ", weatherData);
    //Save temperatures
    if(weatherData) {
      setTemperatures(() => {
        return [...weatherData.hourly.temperature_2m];
      });
      setErrorDisplay(() => false);
    }
      

    setLoading(() => false);
  }, [weatherData]);

  function getWeatherData() {
    if(!searchBarRefs.country.current || !searchBarRefs.city.current) {
      console.log("Failed");
      return;
    }
    
    const country = encodeURIComponent(searchBarRefs.country.current.value);
    const city = encodeURIComponent(searchBarRefs.city.current.value);

    fetchLocation(`https://api.geoapify.com/v1/geocode/search?text=%2C%20${city}%20%2C%20${country}&apiKey=2dafca2a26414552b3f472fefd7a4a52`);
  }

  return (
    <section id='app'>
      <SearchBarContext.Provider value={searchBarRefs}>
        <Header
        loading={loading}
        getWeatherData={getWeatherData}/>
      </SearchBarContext.Provider>
      {temperatures.length > 0 && <WeatherResults
      allTemperatures={temperatures}
      location={searchBarRefs.city.current.value}
      />}
      {errorDisplay && <ErrorDisplay/>}
      {!errorDisplay && !weatherData && <InitialDisplay/>}
    </section>
  )
}

export default App
