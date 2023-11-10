import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Sidebar from './SideBar'
import { MDBDataTable } from 'mdbreact'
import { Loading } from '../Layout/Loading'
import { success, error } from '../Layout/Toast'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { getToken } from '../../utils/helpers'

const UsersList = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${getToken()}`
        }
    }

    const getAllUsers = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/all/users`, config)
            console.log(data)
            setUsers(data.users)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            error(err.response.data.message)
        }
    }

    const deleteUserHandler = (productId) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            // await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete/${productId}`, config)
                            success("Successfully deleted");
                            getAllUsers()
                        } catch (err) {
                            error("Failed to delete");
                        }

                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    useEffect(() => {
        getAllUsers()
    }, []);

    const usersList = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Joined',
                    field: 'createdAt',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: new Date(user.createdAt).toDateString(),
                actions: <Fragment>
                    <Link to={`/admin/user/update/${user._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }
    return (
        <>
            <div className="row">
                <Sidebar />
                <div className="content">
                    <div className='row'>
                        <div className='col-6'>
                            <h1 className="my-4 ml-3" >List of Users</h1>
                        </div>
                        <div className='col-6 d-flex align-items-end justify-content-end pr-5'>
                            <Link className='btn btn-success ml-3 mb-3' to='/admin/user/create'>Add New User</Link>
                        </div>
                        <div className='col-12'>
                            {loading ? <Loading /> : (
                                <MDBDataTable
                                    data={usersList()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                    responsive={true}
                                    responsiveLg={true}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </ >
    )
}

export default UsersList