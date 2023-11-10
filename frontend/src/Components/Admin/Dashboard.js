import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Sidebar from './SideBar'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {

    return (
        <Fragment>
            <div className="row">
                <Sidebar />
                <div className="content">
                    <h1 className="my-4">Dashboard</h1>


                </div>
            </div>
        </Fragment >
    )
}

export default Dashboard