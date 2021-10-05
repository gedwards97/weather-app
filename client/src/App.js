import Header from './components/Header';
import SearchForm from './components/SearchForm';
import WeatherReport from './components/WeatherReport';
import './components/FontAwesomeIcons'
import { useState } from 'react'
import SevenDayForm from './components/SevenDayForm';
import SevenDayForecast from './components/SevenDayForecast';



function App() {

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY
  const [search, setSearch] = useState({})
  const [forecastLocation, setForecastLocation] = useState({});

  // var weatherSpec = {location: 'Norwich'}
  // Submit search
  const searchWeather = (userInput) => {
    setSearch({ ...userInput });
  }

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  } 

  const getForecastLocation = async (location) => {
    try {
      // console.log('STARTED');
      // console.log("Location = ", location);
      // console.log(`http://localhost:5000/locations/${location}`);
      const response = await fetch(`http://localhost:5000/locations/${location}`);
      // console.log("RESPONSE = ", response);
      const json_data = await response.json();
      // console.log("COMPLETED")
      // console.log(json_data);
      setForecastLocation(json_data);
    } catch (error) {
      console.log("ERROR")
      console.log(error.message);
    }
  }

  console.log("Forecast = ", forecastLocation);


  return (
    <div className="container">
      <Header />
      {search.location && 
      <WeatherReport apiKey={apiKey} location={search.location}/>}

      <SearchForm onSearch={searchWeather}/>
      {forecastLocation.id &&
      <SevenDayForecast apiKey={apiKey} location={forecastLocation.location_name} latitude={forecastLocation.latitude} longitude={forecastLocation.longitude} />}
      <SevenDayForm onForecastSubmit={getForecastLocation}/>
    </div>
  );
}

export default App;
