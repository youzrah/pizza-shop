import React, { useState } from 'react'
import { countries } from 'countries-list'
import { success, error } from '../Layout/Toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../../utils/helpers'

const Cart = ({ addItemToCart, cartItems, removeItemFromCart, removeAllFromCart }) => {

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)
    const countriesList = Object.values(countries)
    const navigate = useNavigate();

    const order = {
        orderItems: cartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    }

    const createOrder = async (order) => {
        console.log(order)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/order/new`, order, config)
            success('Order created');
            navigate('/cart')
        } catch (err) {
            error(err.response.data.message)
        }
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        const address = `${e.target.address.value} ${e.target.city.value} ${e.target.postalCode.value} ${e.target.country.value}`
        const number = `${e.target.gcash.value}`
        order.shippingInfo = {
            address,
            phoneNo: number
        }

        createOrder(order)
    }

    const removeItem = (id) => {

        if (window.confirm("Are you sure you want to remove this item?")) {
            removeItemFromCart(id)
        } else {

        }
    }

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (newQty > stock) return;
        addItemToCart(id, newQty, "qty");
    }

    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1;
        if (newQty <= 0) return;
        addItemToCart(id, newQty, "qty");
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems))

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-3">
                <h1>My Cart</h1>
            </div>
            <div className="row justify-content-center pl-lg-5 pr-lg-5">
                <div className="col-lg-7">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.length < 1 ?
                                <tr>
                                    <td>
                                        <p>No items</p>
                                    </td>
                                    <td>
                                        <p>No items</p>
                                    </td>
                                    <td>
                                        <p>No items</p>
                                    </td>
                                    <td>
                                        <p>No items</p>
                                    </td>
                                </tr>
                                :
                                cartItems.map(item => (
                                    <tr key={item.product}>
                                        <td>{item.name}</td>
                                        <td className='d-flex'>
                                            <button className="btn btn-outline-success btn-sm sub mr-lg-3" onClick={() => decreaseQty(item.product, item.quantity)}>-</button>
                                            <input className="quantityform-control form-inline text-center w-50" disabled
                                                value={item.quantity} />
                                            <button className="btn btn-outline-success btn-sm add ml-lg-3" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</button>
                                        </td>
                                        <td className="item-price">{item.quantity * item.price}</td>
                                        <td>
                                            <button onClick={() => removeItem(item.product)} className="btn btn-danger btn-sm">Remove</button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-5">
                    <form id="checkoutForm" method="POST" onSubmit={handleSubmit}>
                        <div className="checkout-card card border-dark mb-3 w-100">
                            <div className="card-header bg-body-secondary border-dark">Order Summary</div>
                            <div className="card-body m-3 row">
                                <div className="form-group form-cart col-lg-12">
                                    <label htmlFor="address">Address </label>
                                    <input type="text" className="form-control form-control-sm" id="address"
                                        placeholder="Enter delivery address" name="address" />
                                </div>
                                <div className="form-group form-cart col-lg-12">
                                    <label htmlFor="city">City</label>
                                    <input type="text" className="form-control form-control-sm" id="city"
                                        placeholder="Enter city" name="city" />
                                </div>
                                <div className="form-group form-cart col-lg-6">
                                    <label htmlFor="postalCode">Postal Code </label>
                                    <input type="text" className="form-control form-control-sm" id="postalCode"
                                        placeholder="Enter postal code" name="postalCode" />
                                </div>
                                <div className="form-group form-cart col-lg-6">
                                    <label htmlFor="country">Country</label>
                                    <select className="form-control form-control-sm" id="country" name="country">
                                        <option value="None">Select country</option>
                                        {countriesList.map(country => (
                                            <option key={country.name} value={country.name}>
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group form-cart col-lg-12">
                                    <label htmlFor="gcash">Gcash Number</label>
                                    <input type="text" className="form-control form-control-sm" id="gcash"
                                        placeholder="Enter delivery address" name="gcash" />
                                </div>
                                <h5 className="card-title col-12"><span>Total Price </span><span
                                    id="total-price">&#8369;{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></h5>
                            </div>
                            <div className="card-footer bg-body-secondary border-dark">
                                <div onClick={removeAllFromCart} className="btn btn-outline-danger">Remove
                                    All</div>
                                <button type="submit" id="checkout"
                                    className="btn btn-outline-success">Checkout</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default Cart