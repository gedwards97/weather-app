import PropTypes from 'prop-types'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const Button = ({ color, text, icon, onClick }) => {
    return (
        <button onClick={onClick} style={{backgroundColor: color}} className='btn'>
            <span className="btn-icon"><FontAwesomeIcon icon={icon} /></span>
            <span className="btn-text">{text}</span>
        </button>
    )
}

Button.propTypes = {
    colour: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button
