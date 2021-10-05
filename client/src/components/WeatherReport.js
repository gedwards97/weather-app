import { useState, useEffect } from 'react';
import CurrentForecast from './CurrentForecast';
import HttpError from './HttpError';
import LoadingIndicator from './LoadingIndicator';

const WeatherReport = ({ apiKey, location }) => {

    // Weather report states
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [temperature, setTemp] = useState(0);
    const [weatherType, setWeatherType] = useState('');
    const [weatherDescription, setWeatherDescription] = useState('');
    const [cloud, setCloud] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const [iconUrl, setIconUrl] = useState('');

    // HTTP state
    const [loading, setLoading] = useState(false)
    const [httpError, setError] = useState(false);

    // Conversion Functions

    // Convert temperature stat from kelivn to degrees
    const kelvinToDegrees = (kelvin) => Math.round(kelvin - 273.15)

    // Convert unix and offset into local time
    const unixToTime = (unix, timezone) => {
        // Convert to local time
        var date = new Date(unix*1000 + (timezone)*1000);
        var offset = date.getTimezoneOffset()*60000;
        date.setTime(date.getTime() + offset);

        // Format into hours and minutes (2400 notation)
        var hours = "0" + date.getHours();
        var minutes = "0" + date.getMinutes();

        return hours.slice(-2) +':'+minutes.slice(-2)
    }

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    } 

    useEffect(() => {
        const fetchWeather = async () => {

            console.log("Having a kitkat...")
            await sleep(1500);

            setError(false);
            
            const currentURL = 'https://api.openweathermap.org/data/2.5/weather?q='+location+'&appid='+apiKey;
            console.log(currentURL)

            try {
                const response = await fetch(currentURL) 
                setLoading(true);
                const data = await response.json()
                console.log(data)
                setName(data.name) //
                setCountry(data.sys.country)
                setTemp(kelvinToDegrees(data.main.temp)) //
                setWeatherType((data.weather[0]).main) //
                setWeatherDescription((data.weather[0]).description) //
                setCloud(data.clouds.all)
                setSunrise(unixToTime(data.sys.sunrise, data.timezone)) //
                setSunset(unixToTime(data.sys.sunset, data.timezone)) //
                setIconUrl("http://openweathermap.org/img/wn/"+data.weather[0].icon+"@4x.png") //
            } catch (err) {
                // throw err.message;
                console.log("ERROR")
                setError(true);
            }
        }
        fetchWeather();
        setLoading(false);
    }, [apiKey, location]);



    return (
        <div className="forecast-container">
            {!loading ? <LoadingIndicator/>: httpError ?<HttpError /> : 
                (<CurrentForecast location={name} country={country} temperature={temperature}
                weatherType={weatherType} weatherDescription={weatherDescription}
                cloud={cloud} sunrise={sunrise} sunset={sunset}
                iconUrl={iconUrl}/>)
            }
        </div>
    )
}

export default WeatherReport
