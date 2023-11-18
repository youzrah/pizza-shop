const Order = require('../models/order');
const Product = require('../models/product');

exports.newOrder = async (req, res, next) => {
    console.log(req.body)
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        order
    });
};

exports.getSingleOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return res.status(404).json({ message: `No Order found with this ID` });
    }

    res.status(200).json({
        success: true,
        order
    });
};

exports.myOrders = async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        orders
    });
};

exports.allOrders = async (req, res, next) => {
    const orders = await Order.find().populate('user');

    const totalAmount = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
};

exports.updateOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    console.log(req.body)
    if (order.orderStatus === 'Delivered') {
        return res.status(404).json({ message: `You have already delivered this order` });
    }

    for (const item of order.orderItems) {
        await updateStock(item.product, item.quantity);
    }

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();
    await order.save();

    res.status(200).json({
        success: true,
    });
};

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}

exports.deleteOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({ message: `No Order found with this ID` });
    }

    await order.remove();

    res.status(200).json({
        success: true
    });
};
