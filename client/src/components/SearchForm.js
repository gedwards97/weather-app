import Button from './Button';
import { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [location, setLocation] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();

        if (!location) {
            alert('Please enter location')
            return
        } 

        onSearch({ location })

        // Clear form after search
        setLocation('')
    }

    return (
        <form className='search-form' onSubmit={onSubmit}>
            <h2>Current Weather</h2>
            <div className='form-control'>
                <label>Location: </label>
                <input type='text' placeholder='Search Location' 
                value={location} onChange={(e) => setLocation(e.target.value)}/>
            </div>

            <div className="button-container">
                <Button color="#379683" text="Search" icon="search-location">
                    <input className="btn form-btn" type='submit' value="search"/>
                </Button>
            </div>
        </form>
    )
}

export default SearchForm