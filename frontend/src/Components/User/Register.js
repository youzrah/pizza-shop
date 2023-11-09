import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { success, error } from '../Layout/Toast'

const Register = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [loadingButton, setLoadingButton] = useState(false)
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/logo192.png')
    const { name, email, password } = user;
    const navigate = useNavigate();

    const onChange = e => {
        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const submitHandler = (e) => {
        setLoadingButton(true)
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);

        register(formData)
    }

    const register = async (userData) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/register`, userData, config)
            setLoadingButton(false)
            success("Account created, you can login")
            setUser(data.user)
            navigate('/login')

        } catch (err) {
            setLoadingButton(false)
            setUser(null)
            error("Failed to register")
        }
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-3">
                <h1>Register</h1>
            </div>
            <div className="row justify-content-center">
                <div className="card col-lg-4 col-md-6 col-sm-12 m-2" >
                    <div className="card-body">
                        <form style={{ height: 'fit-content' }} onSubmit={submitHandler}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter name" value={name} onChange={onChange} name='name' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" id="email" placeholder="Enter email" value={email} onChange={onChange} name='email' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Password</label>
                                <input type="text" className="form-control" id="price" placeholder="Enter password" onChange={onChange} value={password} name='password' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='avatar_upload'>Avatar</label>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <figure className='avatar mr-3 item-rtl'>
                                            <img
                                                src={avatarPreview}
                                                className='rounded-circle'
                                                alt='Avatar Preview'
                                            />
                                        </figure>
                                    </div>
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
                                </div>
                            </div>
                            <button className="btn btn-outline-dark w-25" type="submit" disabled={loadingButton}>
                                {loadingButton ?
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span>Submit</span>
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Register