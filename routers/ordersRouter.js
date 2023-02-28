const express = require('express');
const {getAllOrders,getOrderById, editOrder, deleteOrder,addOrder, getOrderByUserId } = require('../controllers/orderController');
const ordersRouter = express.Router();

ordersRouter.post('/', addOrder);
ordersRouter.get('/', getAllOrders);
ordersRouter.get('/:id', getOrderById);
ordersRouter.get('/user/:id', getOrderByUserId);
ordersRouter.patch("/:id", editOrder)
ordersRouter.delete("/:id", deleteOrder)
module.exports = ordersRouter;