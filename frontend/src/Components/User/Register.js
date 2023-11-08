import React, { useState } from 'react'

const Register = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/logo192.png')

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

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-3">
                <h1>Register</h1>
            </div>
            <div className="row justify-content-center ">
                <div className="card col-5 m-2" >
                    <div className="card-body">
                        <form style={{ height: 'fit-content' }}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter name" name='name' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" id="email" placeholder="Enter email" name='email' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Password</label>
                                <input type="text" className="form-control" id="price" placeholder="Enter password" name='password' />
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

export default Register