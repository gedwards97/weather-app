import Loader from "react-loader-spinner"

const LoadingIndicator = () => {

    return (
        <div className="loader">
            <Loader type="ThreeDots" color="#379683" height="100" width="100" />
        </div>
    )
}

export default LoadingIndicator
