import { useState, useEffect } from 'react'

const WeatherReport = ({ apiKey, location, forecast }) => {

    const [weather, setWeather] = useState({})

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const currentURL = 'https://api.openweathermap.org/data/2.5/weather?q='+location+'&appid='+apiKey
                const response = await fetch(currentURL)
                const data = await response.json()
                setWeather(data.main)
            } catch (err) {
                console.log(err)
            }
        }
        fetchWeather()
    }, [apiKey, location])

    console.log(weather.temp)

    return (
        <div className="forecast-container">
            <h2 id="forecast-title">{location}: {Math.round(weather.temp - 273.15)}°C</h2>
            
        </div>
    )
}

export default WeatherReport
