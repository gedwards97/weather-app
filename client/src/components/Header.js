import PropTypes from 'prop-types'

// Curly braces deconstructs props object
const Header = ({ title }) => {
    return (
        <header>
            <h1>{title}</h1>
        </header>
    )
}

// Default props if none are provided
Header.defaultProps = { 
    title: "What's the Weather Like?",
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
