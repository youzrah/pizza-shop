import React, { useState } from 'react'
import { success, error } from '../Layout/Toast'
import axios from 'axios'
import { useNavigate } from 'react-router'

const PasswordForgot = () => {

    const [loadingButton, setLoadingButton] = useState(false)

    const navigate = useNavigate()

    const forgotPassword = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/password/forgot`, formData, config)
            success("Check your email")
            setLoadingButton(false)
            navigate('/')
        } catch (error) {
            setLoadingButton(false)
            success("Error Occured")
        }
    }

    const submitHandler = (e) => {

        setLoadingButton(true)
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', e.target.email.value);
        forgotPassword(formData)

    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-3">
                <h1>Forgot Password</h1>
            </div>
            <div className="row justify-content-center ">
                <div className="card col-lg-4 col-md-6 col-sm-7 m-2" >
                    <div className="card-body">
                        <form style={{ height: 'fit-content' }} onSubmit={submitHandler}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter email" name='email' />
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

export default PasswordForgot