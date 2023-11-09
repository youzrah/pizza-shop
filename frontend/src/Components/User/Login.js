import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authenticate } from '../../utils/helpers'
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loadingButton, setLoadingButton] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();

    const login = async (email, password) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/login`, { email, password }, config)
            console.log(data)
            authenticate(data, () => navigate("/"))

        } catch (error) {
            toast.error("invalid user or password", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }
    const submitHandler = (e) => {
        e.preventDefault();
        login(email, password)
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-3">
                <h1>Login</h1>
            </div>
            <div className="row justify-content-center ">
                <div className="card col-lg-4 col-md-6 col-sm-7 m-2" >
                    <div className="card-body">
                        <form style={{ height: 'fit-content' }} onSubmit={submitHandler}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter email" name='email' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Password</label>
                                <input type="text" className="form-control" id="price" placeholder="Enter password" name='password' />
                            </div>
                            <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                                <Link>Forgot password?</Link>
                            </div>
                            <div className="card-footer" style={{ display: "flex", justifyContent: "space-between" }}>
                                <button type='submit' className="btn btn-outline-dark">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Login