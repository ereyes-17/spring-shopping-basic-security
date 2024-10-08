import { useDispatch, useSelector } from 'react-redux';
import logo from '../logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearCurrentUser } from "../store/actions/user";
import { Role } from "../models/User";

const NavBar = () => {
    const currentUser = useSelector(state => state.user);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(clearCurrentUser());
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="https://reactjs.org" className="navbar-brand ms-1">
                <img src={logo} alt="logo" className="App-logo" />
                React
            </a>

            <div className="navbar-nav me-auto">
                {currentUser?.role === Role.ADMIN && 
                    <li className="nav-item">
                    <NavLink to="/admin" className="nav-link">Admin</NavLink>
                    </li>
                }
                
                <li className="nav-item">
                    <NavLink to="/home" className="nav-link">Home</NavLink>
                </li>
            </div>

            {!currentUser && 
                <div className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink to="/register" className="nav-link">Sign Up</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/login" className="nav-link">Sign In</NavLink>
                    </li>
                </div>
            }

            {currentUser && 
                <div className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink to="/profile" className="nav-link">{currentUser.username}</NavLink>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={() => logout()}>Logout</a>
                    </li>
                </div>
            }
        </nav>
    )
};

export {NavBar}