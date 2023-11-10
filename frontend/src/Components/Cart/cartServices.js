import axios from "axios";
import { useState } from "react";

export const addToCart = async (e) => {
    const productId = e.target.getAttribute("data-product-id");

    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1//product/${productId}`);

    let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    cartItems.push(data.product)
    
}   