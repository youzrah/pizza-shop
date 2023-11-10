import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar pl-3">
            <div className="active item">PizzaShop</div>
            <Link to='/admin/dashboard' className='item'>Dashboard</Link>
            <div className='item'>Orders</div>
            <Link to='/admin/products/list' className='item'>Products</Link>
            <Link to='/admin/users/list' className='item'>Users</Link>
            <div className='item'>Reviews</div>
        </div>

    )
}

export default Sidebar