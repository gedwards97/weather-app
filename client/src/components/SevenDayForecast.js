import { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator';
import CurrentForecast from './CurrentForecast';
import DayForecast from './DayForecast';



const SevenDayForecast = ({ apiKey, location, latitude, longitude }) => {

    // STATES //

    // Weather
    const [data, setData] = useState({});
    const [forecast, setForecast] = useState([]);
    const [timezone, setTimezone] = useState(null);
    const [dayIndex, setDayIndex] = useState(8);
    const [daySelect, setDaySelect] = useState(false);

    const [date, setDate] = useState(null);

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
            console.log("Forecast = ", forecast)
        } catch (error) {
            console.log(error.message);
        }
    }

    // Presentational Methods 

    const kelvinToDegrees = (kelvin) => Math.round(kelvin - 273.15)

    const smallIconUrl  = (iconCode) => "http://openweathermap.org/img/wn/"+iconCode+".png"
    
    const bigIconUrl  = (iconCode) => "http://openweathermap.org/img/wn/"+iconCode+"@4x.png"

    const unixToTime = (unix, timezone) => {
        // Convert to local time
        var date = new Date(unix*1000 + (timezone)*1000);
        var offset = date.getTimezoneOffset()*60000;
        date.setTime(date.getTime() + offset);

        return date
    }

    const riseSetTime = (unix, timezone) => {
        // Convert to local time
        var date = new Date(unix*1000 + (timezone)*1000);
        var offset = date.getTimezoneOffset()*60000;
        date.setTime(date.getTime() + offset);

        // Format into hours and minutes (2400 notation)
        var hours = "0" + date.getHours();
        var minutes = "0" + date.getMinutes();

        return hours.slice(-2) +':'+minutes.slice(-2)
    }

    const returnDate = (unix, timezone) => {
        // Convert to local time
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug",
                        "Sept", "Oct", "Nov", "Dec"]
        var date = new Date(unix*1000 + (timezone)*1000);
        var offset = date.getTimezoneOffset()*60000;
        date.setTime(date.getTime() + offset);

        console.log(date)

        var day = String(date.getDate())
        var month = date.getMonth()
        var year = String(date.getFullYear())

        return day + ' ' + months[month] +' '+ year
    }

    const divClick = (index) => {
        setDayIndex(index);
        setDaySelect(true);
    }


    console.log(String(unixToTime(1633500919, 3600).getFullYear()));

    useEffect(() => {
        getForecast();
        setLoading(false);
    }, [apiKey, location, latitude, longitude])

    return (
        <div className="forecast-container">
            {!loading ? <LoadingIndicator /> :
            <div className="forecast-container">
                <h2 className="forecast-location">{location} (GB)</h2>
                <div className="week-container">
                    {forecast.map((day, index) => (
                        <div className="day" key={index} onClick={e => divClick(index)}>
                            <p>{unixToTime(day.dt, timezone).getDate()}/{unixToTime(day.dt, timezone).getMonth()+1}</p>
                            <img src={smallIconUrl(day.weather[0].icon)} />
                            <p>{kelvinToDegrees(day.temp.day)}°C</p>
                        </div>
                    ))}
                </div>
                {daySelect ? (<DayForecast date={returnDate(forecast[dayIndex].dt, timezone)} temperature={kelvinToDegrees(forecast[dayIndex].temp.day)}
                weatherType={forecast[dayIndex].weather[0].main} weatherDescription={forecast[dayIndex].weather[0].description}
                cloud={forecast[dayIndex].clouds} sunrise={riseSetTime(forecast[dayIndex].sunrise, timezone)} 
                sunset={riseSetTime(forecast[dayIndex].sunset, timezone)} iconUrl={bigIconUrl(forecast[dayIndex].weather[0].icon)}/>) : <></>}
            </div>}
        </div>
    )
}

export default SevenDayForecast;
