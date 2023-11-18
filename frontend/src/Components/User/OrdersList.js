import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { Loading } from '../Layout/Loading'
import { success, error } from '../Layout/Toast'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { getToken } from '../../utils/helpers'

const OrdersList = () => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${getToken()}`
        }
    }

    const getOrders = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/orders/me`, config)
            console.log(data)
            setOrders(data.orders)
            setLoading(false)
        } catch (err) {
            error(err.response.data.message)

        }
    }

    useEffect(() => {
        getOrders()
    }, []);

    const ordersList = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Items',
                    field: 'items',
                    sort: 'asc'
                },
                {
                    label: 'Shipping Price',
                    field: 'shippingPrice',
                    sort: 'asc'
                },
                {
                    label: 'Total Price',
                    field: 'totalPrice',
                    sort: 'asc'
                },
                {
                    label: 'Order Status',
                    field: 'orderStatus',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            const formattedItems = order.orderItems ? order.orderItems.map(item => item.name).join(', ') : '';
            data.rows.push({
                id: order._id,
                user: order.user.name,
                items: formattedItems,
                taxPrice: `₱${order.taxPrice}`,
                shippingPrice: `₱${order.shippingPrice}`,
                totalPrice: `₱${order.totalPrice}`,
                orderStatus: order.orderStatus,
            })
        })

        return data;
    }

    return (
        <div className='container'>
            {loading ? <Loading /> : (
                <MDBDataTable
                    data={ordersList()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            )}
        </div>
    )
}

export default OrdersList