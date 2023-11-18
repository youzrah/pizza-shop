import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Sidebar from './SideBar'
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
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    }

    const getAdminOrders = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/orders`, config)
            console.log(data)
            setOrders(data.orders)
            setLoading(false)
        } catch (err) {
            error(err.response.data.message)

        }
    }

    // const deleteOrderHandler = (id) => {
    //     confirmAlert({
    //         title: 'Confirm to submit',
    //         message: 'Are you sure to do this.',
    //         buttons: [
    //             {
    //                 label: 'Yes',
    //                 onClick: async () => {
    //                     try {
    //                         await axios.delete(`${process.env.REACT_APP_API}/api/v1/order/delete/${id}`, config)
    //                         success("Successfully deleted");
    //                         getAdminOrders()
    //                     } catch (err) {
    //                         error("Failed to delete");
    //                     }

    //                 }
    //             },
    //             {
    //                 label: 'No',
    //                 onClick: () => { }
    //             }
    //         ]
    //     });
    // }

    const updateOrder = async (id, status) => {
        const formData = new FormData();
        formData.set('status', status);
        setLoading(true)
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/order/${id}`, formData, config)
            getAdminOrders()
            setLoading(false)
        } catch (err) {
            error(err.response.data.message)
        }
    }

    useEffect(() => {
        getAdminOrders()
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
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Items',
                    field: 'items',
                    sort: 'asc'
                },
                {
                    label: 'Tax Price',
                    field: 'taxPrice',
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
                {
                    label: 'Actions',
                    field: 'actions',
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
                actions: <Fragment>
                    {order.orderStatus === 'Processing' ?
                        <button className="btn btn-success py-1 px-2 ml-2" onClick={() => updateOrder(order._id, 'Confirmed')}>
                            Confirmed
                        </button>
                        :
                        order.orderStatus == 'Confirmed' ?
                            <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => updateOrder(order._id, 'Shipped')}>
                                Shipped
                            </button>
                            :
                            order.orderStatus == 'Shipped' ?
                                <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => updateOrder(order._id, 'Delivered')}>
                                    Delivered
                                </button>
                                :
                                <button className="btn btn-danger py-1 px-2 ml-2" disabled>
                                    Finished
                                </button>
                    }

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
                            <h1 className="my-4" >List of Orders</h1>
                        </div>
                        <div className='col-12'>
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
                    </div>
                </div>
            </div >
        </ >
    )
}

export default OrdersList