import React from 'react'

const Cart = ({ addItemToCart, cartItems, removeItemFromCart }) => {
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
                            <tr>
                                <td>Pizza</td>
                                <td className='d-flex'>
                                    <button data-id="{{ $key }}"
                                        className="btn btn-outline-success btn-sm sub mr-lg-3">-</button>
                                    <input className="quantityform-control form-inline text-center w-50" disabled
                                        value="10" />
                                    <button data-id="{{ $key }}"
                                        className="btn btn-outline-success btn-sm add ml-lg-3">+</button>
                                </td>
                                <td className="item-price">200</td>
                                <td>
                                    <a href="#!" className="btn btn-danger btn-sm">Remove</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-5">
                    <form id="checkoutForm" method="POST">
                        <div className="checkout-card card border-dark mb-3 w-100">
                            <div className="card-header bg-body-secondary border-dark">Order Summary</div>
                            <div className="card-body m-3">
                                <div className="form-group form-cart">
                                    <label htmlFor="address">Delivery Address </label> <i className="bi bi-info-circle"
                                        data-toggle="tooltip" data-placement="top"
                                        title="If you leave this blank, we deliver it to your home address"></i>
                                    <input type="text" className="form-control" id="address"
                                        placeholder="Enter delivery address" name="address" />
                                </div>
                                <div className="form-group form-cart">
                                    <label htmlFor="address">Payment Method</label>
                                    <select className="form-control" id="payment" name="payment_id">
                                        <option value="">Select payment method</option>
                                    </select>
                                </div>

                                <h5 className="card-title"><span>Total Price </span><span
                                    id="total-price">&#8369;200</span></h5>
                            </div>
                            <div className="card-footer bg-body-secondary border-dark">
                                <a href="#!" className="btn btn-outline-danger">Remove
                                    All</a>
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