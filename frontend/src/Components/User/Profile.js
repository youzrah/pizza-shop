import React, { useEffect, useState } from 'react'
import { getUser, getToken } from '../../utils/helpers'
import { success, error } from '../Layout/Toast'
import axios from 'axios'
import { authenticate } from '../../utils/helpers'
import { Link, useNavigate } from 'react-router-dom'
import OrdersList from './OrdersList'

const Profile = () => {

    const [newUserInfo, setNewUserInfo] = useState({
        name: '',
        email: ''
    })
    const [user, setUser] = useState({});
    const [editable, setEditable] = useState(false);
    console.log(user)
    const [avatar, setAvatar] = useState('')
    const { name, email } = newUserInfo
    const navigate = useNavigate();
    const [loadingButton, setLoadingButton] = useState(false)

    const updateProfile = async (formData) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            }
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/update/profile/${user._id}`, formData, config)
            success("Updated successfully")
            setEditable(false)
            setLoadingButton(false)
            authenticate(data, () => navigate("/ako"))
        } catch (err) {
            setLoadingButton(false)
            error("Failed to update")
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setLoadingButton(true)
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        updateProfile(formData);
    }

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
            setNewUserInfo({ ...newUserInfo, [e.target.name]: e.target.value })
        }
    }

    useEffect(() => {
        setUser(getUser())
    }, [])

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center mt-3">
                    <h1>My Profile</h1>
                </div>
                <div className="row justify-content-center ">
                    <div className="card col-lg-4 col-md-6 col-sm-7 m-2" >
                        <img className="card-img-top mt-2 w-100" style={{ objectFit: "cover" }}
                            src={!avatar ? user.avatar && user.avatar.url : avatar}
                            alt="Card image cap" />
                        <div className="card-body">
                            <form>
                                {editable ?
                                    <div className='form-group'>
                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='avatar'
                                                className='custom-file-input'
                                                id='customFile'
                                                accept="images/*"
                                                onChange={onChange}
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                Choose Avatar
                                            </label>
                                        </div>
                                    </div> : ""
                                }
                                <div className="form-inline" >
                                    <label htmlFor="name" className=' mr-2'>Name</label>
                                    <input disabled={!editable} type="text" className="form-control w-100" id="name" name='name' placeholder={user.name} value={name} onChange={onChange} />
                                </div>
                                <div className="form-inline">
                                    <label htmlFor="email" className=' mr-2'>Email</label>
                                    <input disabled={!editable} type="text" className="form-control w-100" id="email" name='email' placeholder={user.email} value={email} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="card-footer" style={{ display: "flex", justifyContent: "space-between" }}>
                            {!editable ?
                                <button href="{{ route('add.cart', $product->id) }}" className="btn btn-outline-success" onClick={() => setEditable(true)}>Edit Profile</button> :
                                <>
                                    <button className="btn btn-outline-dark w-25" onClick={submitHandler} type="submit" disabled={loadingButton}>
                                        {loadingButton ?
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span>Update</span>
                                        }
                                    </button>
                                </>
                            }
                            <Link to='/forgot/password' className="btn btn-outline-danger">Update Password</Link>
                        </div>
                    </div>
                </div>

            </div>
            <OrdersList />
        </>
    )
}

export default Profile