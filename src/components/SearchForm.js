import Button from './Button';
import { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [location, setLocation] = useState('')
    const [forecast, setForecast] = useState('current')

    const onSubmit = (e) => {
        e.preventDefault();

        if (!location) {
            alert('Please enter location')
            return
        } 

        onSearch({ location, forecast })

        // Clear form after search
        setLocation('')
        setForecast('current')
    }

    return (
        <form className='search-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Location: </label>
                <input type='text' placeholder='Search Location' 
                value={location} onChange={(e) => setLocation(e.target.value)}/>
            </div>
            
            <div className='form-control'>
                <label>Forecast Type: </label>
                <select name="forecast" onChange={(e) => setForecast(e.currentTarget.value)}>
                    <option value="current">Current</option>
                    <option value="two">Two Days</option>
                    <option value="seven">Seven Days</option>
                </select>
            </div>

            <div className="button-container">
                <Button color="#379683" text="Search" icon="globe-europe">
                    <input className="btn form-btn" type='submit' value="search"/>
                </Button>
            </div>
        </form>
    )
}

export default SearchForm