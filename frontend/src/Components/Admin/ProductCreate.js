import React, { useState } from 'react'
import Sidebar from './SideBar'
import { success } from '../Layout/Toast'

const ProductCreate = () => {

    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
    })

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

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
        success('Success')
        // createProduct(formData)
    }

    const createProduct = async (productData) => {

    }
    return (
        <>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4" >Create Product</h1>
                    <div className='row'>
                        <div className='col-lg-6 col-md-12'>
                            <form className='p-5 ml-5 mr-5 card' style={{ height: 'fit-content' }} onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Product Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter product name" name='name' onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Product Price</label>
                                    <input type="text" className="form-control" id="price" placeholder="Enter product price" name='price' onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Product Description</label>
                                    <textarea className="form-control" id="description" placeholder="Enter product description" name='description' onChange={onChange} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="category">Product Category</label>
                                    <select className="custom-select" id="category" name='category' onChange={onChange}>
                                        <option defaultValue>Select product category</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock">Product Stock</label>
                                    <input type="text" className="form-control" id="stock" placeholder="Enter product stock" name='stock' onChange={onChange} />
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
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className='col-lg-6 col-md-12'>
                            <p className="h2">Uploaded Image Will Show Up Below</p>
                            {imagesPreview.map(img => (
                                <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="100" height="100" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ >
    )
}

export default ProductCreate