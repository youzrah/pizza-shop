import React from 'react'
import Register from '../User/Register'
import Sidebar from './SideBar'

const UserCreate = () => {

    return (
        <>
            <div className="row">
                <Sidebar />
                <div className="content">
                    <h1 className="my-4" >Create User</h1>
                    <div className='row'>
                        <Register />
                    </div>
                </div>
            </div>
        </ >
    )

}

export default UserCreate