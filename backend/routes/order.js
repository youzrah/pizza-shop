const express = require('express')
const router = express.Router();

const {
    newOrder,
    allOrders,
    myOrders,
    updateOrder
} = require('../controllers/orderController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.post('/order/new', isAuthenticatedUser, newOrder);
router.get('/admin/orders', isAuthenticatedUser, authorizeRoles('admin'), allOrders);
router.get('/orders/me', isAuthenticatedUser, myOrders);
router.put('/admin/order/:id', isAuthenticatedUser, authorizeRoles('admin'), updateOrder)

module.exports = router