import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import { Loading } from './Layout/Loading'
import { success, error } from './Layout/Toast'

const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            // 'Authorization': `Bearer ${getToken()}`
        }
    }

    const getProducts = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products`, config)
            console.log(data)
            setProducts(data.products)
            setLoading(false)
        } catch (err) {

            error(err.response.data.message)

        }
    }

    useEffect(() => {
        getProducts()
    }, []);

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-3">
                <h1>Avaiable Pizza</h1>
            </div>
            <div className="row justify-content-center ">
                {products.map((product) => {
                    return (
                        <div className="card col-md-3 m-2" key={product._id}>
                            <img className="card-img-top mt-3 w-100" style={{ height: "200px", objectFit: 'cover' }} src={product.images && product.images[0].url} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title" style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span>{product.name}</span><span>&#8369;{product.price}</span>
                                </h5>
                                <p className="card-text">{product.description}</p>
                            </div>
                            <div className="card-footer" style={{ display: "flex", justifyContent: "space-between" }}>
                                <a href="{{ route('add.cart', $product->id) }}" className="btn btn-outline-success">Add to Cart</a>
                                <a href="{{ route('product.details', $product->id) }}" className="btn btn-outline-dark">Quick View</a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default Home