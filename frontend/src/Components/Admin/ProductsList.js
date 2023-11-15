import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Sidebar from './SideBar'
import { MDBDataTable } from 'mdbreact'
import { Loading } from '../Layout/Loading'
import { success, error } from '../Layout/Toast'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const ProductList = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            // 'Authorization': `Bearer ${getToken()}`
        }
    }

    const getAdminProducts = async () => {
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

    const deleteProductHandler = (productId) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete/${productId}`, config)
                            success("Successfully deleted");
                            getAdminProducts()
                        } catch (err) {
                            error("Failed to delete");
                        }

                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    useEffect(() => {
        getAdminProducts()
    }, []);

    const productsList = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Description',
                    field: 'description',
                    sort: 'asc'
                },
                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `₱${product.price}`,
                description: product.description,
                category: product.category,
                stock: product.stock,
                actions: <Fragment>
                    <Link to={`/admin/product/update/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }
    return (
        <>
            <div className="row">
                <Sidebar />
                <div className="content">
                    <div className='row'>
                        <div className='col-12'>
                            <h1 className="my-4" >List of Products</h1>
                        </div>
                        <div className='col-12'>
                            <Link className='btn btn-success ml-3 mb-3' to='/admin/product/create'>Create New Product</Link>
                        </div>
                        <div className='col-12'>
                            {loading ? <Loading /> : (
                                <MDBDataTable
                                    data={productsList()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </ >
    )
}

export default ProductList