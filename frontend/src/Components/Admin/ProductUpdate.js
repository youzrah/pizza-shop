import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { success, error } from '../Layout/Toast'

import Sidebar from './SideBar'

const categories = [
    'Neapolitan Pizza',
    'New York-Style Pizza',
    'Chicago-Style Pizza',
    'Sicilian Pizza',
    'Margherita Pizza',
    'Pepperoni Pizza',
    'Hawaiian Pizza',
    'Vegetarian Pizza',
    'Meat Lovers Pizza',
    'BBQ Chicken Pizza',
    'White Pizza',
    'Seafood Pizza',
]

const ProductUpdate = () => {

    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
    })

    const navigate = useNavigate();
    const [loadingButton, setLoadingButton] = useState(false)
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])
    const { productId } = useParams('productId')

    const getProductDetails = async (id) => {

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/${productId}`)
            setProduct(data.product)
            console.log(data.product)
        } catch (error) {
            error(error.response.data.message)

        }
    }

    useEffect(() => {
        getProductDetails()
    }, [productId])

    const onChange = e => {
        console.log(e.target.name, e.target.value);
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setImagesPreview([]);
            setImages([])
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setImagesPreview(oldArray => [...oldArray, reader.result])
                        setImages(oldArray => [...oldArray, reader.result])
                    }
                }
                reader.readAsDataURL(file)
            })
        } else {
            setProduct({ ...product, [e.target.name]: e.target.value })
        }

    }

    const handleSubmit = (e) => {

        e.preventDefault();
        const formData = new FormData();

        formData.set('name', product.name);
        formData.set('price', product.price);
        formData.set('description', product.description);
        formData.set('category', product.category);
        formData.set('stock', product.stock);

        images.forEach(image => {
            formData.append('images', image)
        })

        updateProduct(formData)
    }

    const updateProduct = async (productData) => {
        setLoadingButton(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${getToken()}`
                }
            }

            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update/${productId}`, productData, config)
            success("Updated Successfully");
            setLoadingButton(false)
            navigate('/products/list')
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
                                    <label htmlFor="name">Product Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter product name" name='name' value={product.name} onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Product Price</label>
                                    <input type="text" className="form-control" id="price" placeholder="Enter product price" name='price' onChange={onChange} value={product.price} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Product Description</label>
                                    <textarea className="form-control" id="description" placeholder="Enter product description" name='description' onChange={onChange} value={product.description} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="category">Product Category</label>
                                    <select className="custom-select" id="category" name='category' onChange={onChange}>
                                        <option defaultValue value={product.category}>{product.category}</option>
                                        {categories.map(category => (
                                            <option key={category} value={category} >{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock">Product Stock</label>
                                    <input type="text" className="form-control" id="stock" placeholder="Enter product stock" name='stock' onChange={onChange} value={product.stock} />
                                </div>
                                <div className='form-group'>
                                    <label>Images</label>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>
                                </div>
                                <button className="btn btn-primary" type="submit" disabled={loadingButton}>
                                    {loadingButton ?
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span>Update Product</span>}
                                </button>
                            </form>
                        </div>
                        <div className='col-lg-6 col-md-12'>
                            <p className="h2">Uploaded Image Will Show Up Below</p>
                            {imagesPreview.length > 0 ?
                                imagesPreview.map(img => (
                                    <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="250" height="250" style={{ borderColor: 'black', borderStyle: 'solid' }} />
                                )) :
                                product.images && product.images.map(img => (
                                    <img src={img.url} key={img.url} alt="Images Preview" className="mt-3 mr-2" width="250" height="250" style={{ borderColor: 'black', borderStyle: 'solid' }} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductUpdate