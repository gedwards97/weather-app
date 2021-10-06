import React from 'react'

const DayForecast = ({ date, temperature, weatherType, weatherDescription,
    cloud, sunrise, sunset, iconUrl }) => {
    return (
        <div className="current-forecast-container">
            <h2 id="forecast-title">{date}</h2>
            <div className="current-report">
                <div className="report-image">
                    <img src={iconUrl} />
                </div>
                <div className="report-text">
                    <p>Temperature: {temperature}°C</p>
                    <p>Weather: {weatherType}</p> 
                    <p>Description: {weatherDescription}</p> 
                    <p>Cloudiness: {cloud}%</p> 
                    <p>Sunrise: {sunrise}</p> 
                    <p>Sunset: {sunset}</p>
                </div>
            </div>            
        </div>
    )
}

export default DayForecast
