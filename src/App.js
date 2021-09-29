import Header from './components/Header';
import SearchForm from './components/SearchForm';
import WeatherReport from './components/WeatherReport';
import './components/FontAwesomeIcons'
import { useState } from 'react'



function App() {

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY
  const [search, setSearch] = useState({})

  // var weatherSpec = {location: 'Norwich'}
  // Submit search
  const searchWeather = (userInput) => {
    setSearch({ ...userInput });
  }


  return (
    <div className="container">
      <Header />

      {(search.location && search.forecast) && 
      <WeatherReport apiKey={apiKey} location={search.location} forecast={search.forecast}/>}

      <SearchForm onSearch={searchWeather}/>
    </div>
  );
}

export default App;
