import { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator';


const SevenDayForecast = ({ apiKey, location, latitude, longitude }) => {

    // STATES //

    // Weather
    const [data, setData] = useState({});
    const [forecast, setForecast] = useState([]);
    const [timezone, setTimezone] = useState(null);

    // Http //
    const [loading, setLoading] = useState(false);


    // METHODS //

    // API Requests
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    } 

    const getForecast = async () => {
        const forecastURL = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&exclude=current,minutely,hourly&appid='+apiKey;
        
        await sleep(500);

        try {
            const response = await fetch(forecastURL);
            setLoading(true);
            const data = await response.json();
            setData(data);
            setForecast(data.daily);
            setTimezone(data.timezone_offset);
            // console.log(forecast[0].dt)
            console.log("DATETIME EXAMPLE = ", unixToTime(forecast[0].dt, timezone).getMonth());
        } catch (error) {
            console.log(error.message);
        }
    }

    // Presentational Methods 

    const kelvinToDegrees = (kelvin) => Math.round(kelvin - 273.15)

    const imageUrl = (iconCode) => "http://openweathermap.org/img/wn/"+iconCode+".png"

    const unixToTime = (unix, timezone) => {
        // Convert to local time
        var date = new Date(unix*1000 + (timezone)*1000);
        var offset = date.getTimezoneOffset()*60000;
        date.setTime(date.getTime() + offset);

        return date
    }


    console.log("DATA = ", data);

    useEffect(() => {
        getForecast();
        setLoading(false);
    }, [apiKey, location, latitude, longitude])

    return (
        <div className="forecast-container">
            {!loading ? <LoadingIndicator /> :
            <div className="forecast-container">
                <h2 className="forecast-location">{location}</h2>
                <div className="week-container">
                    {forecast.map(day => (
                        <div className="day">
                            <p>{unixToTime(day.dt, timezone).getDate()}/{unixToTime(day.dt, timezone).getMonth()}</p>
                            <img src={imageUrl(day.weather[0].icon)} />
                            <p>{kelvinToDegrees(day.temp.day)}°C</p>
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    )
}

export default SevenDayForecast;
