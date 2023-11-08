import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Sidebar from './SideBar'
import { MDBDataTable } from 'mdbreact'
import { Loading } from '../Layout/Loading'
import { success, error } from '../Layout/Toast'

const ProductList = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const getAdminProducts = async () => {
        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': `Bearer ${getToken()}`
                }
            }

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products`, config)
            console.log(data)
            setProducts(data.products)
            setLoading(false)
        } catch (err) {

            error(err.response.data.message)

        }
    }

    const deleteProductHandler = () => {

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
                    <Link to={`/product/update/${product._id}`} className="btn btn-primary py-1 px-2">
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
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4" >List of Products</h1>
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
        </ >
    )
}

export default ProductList