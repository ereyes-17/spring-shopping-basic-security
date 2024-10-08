import { Link, useLocation } from "react-router-dom";
//constants
const NOT_FOUND = "not-found";
const UNAUTHORIZED = "unauthorized";
const HTTP_404 = "404";
const HTTP_401 = "401";

const ExceptionPage = () => {
    const location = useLocation();
    var locationElements = location.pathname.split("/");
    var message = locationElements[locationElements.length - 1] === UNAUTHORIZED ? UNAUTHORIZED : NOT_FOUND;
    var code = locationElements[locationElements.length - 1] === UNAUTHORIZED ? HTTP_401 : HTTP_404;
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <span className="display-1">
                        {code}
                    </span>
                    <div className="mb-4 lead">
                        {message}
                    </div>
                <Link to ="/home" className="btn btn-link">Go back home</Link>
                </div>
            </div>
        </div>
    );
};

export {ExceptionPage}