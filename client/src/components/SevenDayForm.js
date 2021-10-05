import { useEffect, useState } from 'react';
import Button from './Button';


const SevenDayForm = ({ onForecastSubmit }) => {
    // States
    const [select, setSelect] = useState('');
    const [locations, setLocations] = useState([]);

    // Functions

    const getLocations = async () => {
        try {
            const response = await fetch("http://localhost:5000/locations");
            const json_data = await response.json();
            
            setLocations(json_data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        onForecastSubmit(select);

        setSelect('')
    }

    useEffect(() => {
        getLocations();
    }, []);


    return (
        <form className='search-form' onSubmit={onSubmit}>
            <h2>7-Day Forecast</h2>
            <div className='form-control'>
                <label>Location: </label>
                <select name="locations" onChange={(e) => setSelect(e.target.value)}>
                    {locations.map(location => (
                        <option key={location.id} value={location.location_name}>{location.location_name}</option>
                    ))}
                </select>
            </div>

            <div className="button-container">
                <Button color="#379683" text="Search" icon="sun">
                    <input className="btn form-btn" type='submit' value="search"/>
                </Button>
            </div>
        </form>
    )
}

export default SevenDayForm
