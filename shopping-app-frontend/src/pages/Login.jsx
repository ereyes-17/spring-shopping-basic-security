import { useEffect, useState } from "react";
import User from "../models/User";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../services/authentication.service";
import "../styles/register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { setCurrentUser } from "../store/actions/user"

const LoginPage = () => {
    const [user, setUser] = useState(new User("", "", ""));
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const currentUser = useSelector(state => state.user);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    //mounted
    useEffect(() => {
        if (currentUser?.id) {
            // go to profile
            navigate("/profile");
        }
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser((prevState => {
            return {
                ...prevState,
                [name]: value
            }
        }));
    }

    const handleLogin = (e) => {
        e.preventDefault();

        setSubmitted(true);

        if (!user.username || !user.password) {
            return;
        }

        setLoading(true);

        AuthenticationService.login(user).then(response => {
            dispatch(setCurrentUser(response.data));
            navigate("/profile");
        })
        .catch(error => {
            console.log(error);
            if (error?.response?.status === 401) {
                setErrorMessage("Username or password invalid");
            } else {
                setErrorMessage("Unexpected error occurred: " + error);
            }

            setLoading(false);
        });
    };

    return (
        <div className="container mt-5">
            <div className="card ms-auto me-auto p-3 shadow-lg custom-card">
                <FontAwesomeIcon icon={faUserCircle} className="ms-auto me-auto user-icon" />
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                <form onSubmit={(e) => handleLogin(e)} noValidate className={submitted ? "was-validated" : ""}>

                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" className="form-control" placeholder="username" value={user.username} onChange={(e) => handleChange(e)} required/>
                        <div className="invalid-feedback">Username is required.</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Username:</label>
                        <input type="password" name="password" className="form-control" placeholder="password" value={user.password} onChange={(e) => handleChange(e)} required/>
                        <div className="invalid-feedback">Invalid password.</div>
                    </div>

                    <button className="btn btn-info w-100 mt-3" disabled={loading}>
                        Login
                    </button>

                </form>

                <Link to="/register" className="btn btn-link" style={{color: "darkgray"}}>
                    Create an account
                </Link>
            </div>
        </div>
    )
};

export {LoginPage}