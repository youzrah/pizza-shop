import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-3">
                <h1>Login</h1>
            </div>
            <div className="row justify-content-center ">
                <div className="card col-5 m-2" >
                    <div className="card-body">
                        <form style={{ height: 'fit-content' }}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter email" name='email' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Password</label>
                                <input type="text" className="form-control" id="price" placeholder="Enter password" name='password' />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer" style={{ display: "flex", justifyContent: "space-between" }}>
                        <button type='submit' className="btn btn-outline-dark">Submit</button>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Login