import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, logout } from '../../utils/helpers';
import axios from 'axios';
import { success, error } from '../Layout/Toast';

const Header = () => {

    const [user, setUser] = useState('')
    const navigate = useNavigate()
    const logoutUser = async () => {

        try {
            await axios.get(`${process.env.REACT_APP_API}/api/v1/logout`)
            success("You are logout")
            setUser('')

            logout(() => navigate('/'))
        } catch (err) {
            error("Error Occured")
        }
    }

    const logoutHandler = () => {
        logoutUser();
    }

    useEffect(() => {
        setUser(getUser())
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ paddingRight: "100px", paddingLeft: "100px" }}>
            <a className="navbar-brand" href="/">PizzaShop</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0 mr-5">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                {user ?
                    <div className="btn-group">
                        <div className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Hudda
                        </div>
                        <div className="dropdown-menu dropdown-menu-right" style={{ marginRight: "-20px" }}>
                            <Link className="dropdown-item" type="button">Profile</Link>
                            <Link className="dropdown-item" type="button">Cart(1)</Link>
                            <Link className="dropdown-item" type="button">Orders</Link>
                            <Link className="dropdown-item" type="button" onClick={logoutHandler}>Logout</Link>
                        </div>
                    </div> :
                    <>
                        <Link to='/login' className="btn btn-primary mr-2">Login</Link>
                        <Link to='/register' className="btn btn-primary">Register</Link>
                    </>
                }
            </div>
        </nav>
    )
}

export default Header