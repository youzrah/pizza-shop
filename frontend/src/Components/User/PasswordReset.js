import React, { useState } from 'react'
import { success, error } from '../Layout/Toast'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const PasswordReset = () => {

    const [loadingButton, setLoadingButton] = useState(false)
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { token } = useParams();

    const resetPassword = async (token, passwords) => {
        setLoadingButton(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/password/reset/${token}`, passwords, config)
            success("Reset password successfully, you may now login with your new password")
            navigate("/login")
            setLoadingButton(false)
        } catch (err) {
            error("Error Occured")
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);
        resetPassword(token, formData)
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-3">
                <h1>Reset Password</h1>
            </div>
            <div className="row justify-content-center ">
                <div className="card col-lg-4 col-md-6 col-sm-7 m-2" >
                    <div className="card-body">
                        <form style={{ height: 'fit-content' }} onSubmit={submitHandler}>
                            <div className="form-group">
                                <label htmlFor="password">New Password</label>
                                <input type="text" className="form-control" id="password" placeholder="Enter new password" name='password' onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="text" className="form-control" id="confirmPassword" placeholder="Confirm password" name='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} />
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

export default PasswordReset