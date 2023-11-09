import React from 'react'

const Profile = () => {
    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-3">
                <h1>My Profile</h1>
            </div>
            <div className="row justify-content-center ">
                <div className="card col-lg-4 col-md-6 col-sm-7 m-2" >
                    <img className="card-img-top mt-2 w-100" style={{ objectFit: "cover" }} src="/logo192.png" alt="Card image cap" />
                    <div className="card-body">
                        <form>
                            <div className="form-inline">
                                <label htmlFor="name" className=' mr-2'>Name</label>
                                <input type="text" className="form-control w-100" id="name" placeholder="Enter name" />
                            </div>
                            <div className="form-inline">
                                <label htmlFor="email" className=' mr-2'>Email</label>
                                <input type="text" className="form-control w-100" id="email" placeholder="Enter email" />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer" style={{ display: "flex", justifyContent: "space-between" }}>
                        <a href="{{ route('add.cart', $product->id) }}" className="btn btn-outline-success">Update Profile</a>
                        <a href="{{ route('product.details', $product->id) }}" className="btn btn-outline-danger">Update Password</a>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Profile