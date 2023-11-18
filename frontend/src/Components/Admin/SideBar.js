import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, logout } from '../../utils/helpers';
import axios from 'axios';
import { success, error } from '../Layout/Toast';

const Sidebar = () => {
    const navigate = useNavigate()
    const logoutUser = async () => {

        try {
            await axios.get(`${process.env.REACT_APP_API}/api/v1/logout`)
            success("You are logout")

            logout(() => navigate('/'))
            window.location.reload()
        } catch (err) {
            error("Error Occured")
        }
    }

    const logoutHandler = () => {
        logoutUser();
    }

    return (
        <div className="sidebar pl-3">
            <div className="active item">PizzaShop</div>
            <Link to='/admin/dashboard' className='item'>Dashboard</Link>
            <Link to='/admin/orders' className='item'>Orders</Link>
            <Link to='/admin/products/list' className='item'>Products</Link>
            <Link to='/admin/users/list' className='item'>Users</Link>
            <a href='/ako' className='item'>Profile</a>
            <div onClick={logoutHandler} className='item'>Logout</div>
        </div>

    )
}

export default Sidebar