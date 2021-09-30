const CurrentForecast = ({ location, country, temperature, weatherType, weatherDescription,
                        cloud, sunrise, sunset, iconUrl }) => {
    
    console.log(cloud)
    
    return (
        <div className="current-forecast-container">
            <h2 id="forecast-title">{location} ({country})</h2>
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

export default CurrentForecast
