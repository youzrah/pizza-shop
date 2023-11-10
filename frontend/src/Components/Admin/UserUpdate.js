import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { success, error } from '../Layout/Toast'

import Sidebar from './SideBar'
import { getToken } from '../../utils/helpers'

const UserUpdate = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        role: '',
    })

    const navigate = useNavigate();
    const [loadingButton, setLoadingButton] = useState(false)
    const [avatar, setAvatar] = useState('')
    const { userId } = useParams('userId')

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    }

    const getUserDetails = async (id) => {

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/details/${id}`, config)
            setUser(data.user)

        } catch (err) {
            error(err.response.data.message)
        }
    }

    useEffect(() => {
        getUserDetails(userId)
    }, [userId])

    const onChange = e => {
        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = (e) => {
        setLoadingButton(true)
        e.preventDefault();
        const formData = new FormData();

        formData.set('name', user.name);
        formData.set('email', user.email);
        formData.set('role', user.role);
        formData.set('avatar', avatar);

        updateUser(formData)
    }

    const updateUser = async (userData) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/update/user/${userId}`, userData, config)
            success("Updated Successfully");
            setLoadingButton(false)
            navigate('/admin/users/list')
        } catch (err) {
            error(err.response.data.message)
            setLoadingButton(false)
        }
    }

    return (
        <>
            <div className="row">
                <Sidebar />
                <div className="content">
                    <h1 className="my-4" >Update Product</h1>
                    <div className='row'>
                        <div className='col-lg-6 col-md-12'>
                            <form className='p-5 ml-5 mr-5 card' style={{ height: 'fit-content' }} onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">User Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter product name" name='name' value={user.name} onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">User Email</label>
                                    <input type="text" className="form-control" id="email" placeholder="Enter product price" name='email' onChange={onChange} value={user.email} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role">User Role</label>
                                    <select className="form-control" id="role" placeholder="Enter product description" name='role' onChange={onChange}>
                                        <option selected={user.role == 'admin'}>Admin</option>
                                        <option selected={user.role == 'user'}>User</option>
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <label>Avatar</label>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='avatar'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>
                                </div>
                                <button className="btn btn-primary" type="submit" disabled={loadingButton}>
                                    {loadingButton ?
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span>Update User</span>}
                                </button>
                            </form>
                        </div>
                        <div className='col-lg-6 col-md-12'>
                            <p className="h2">Uploaded Image Will Show Up Below</p>
                            <img src={!avatar ? user.avatar && user.avatar.url : avatar} alt="Images Preview" className="mt-3 mr-2" width="250" height="250" style={{ borderColor: 'black', borderStyle: 'solid' }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserUpdate