const orderModel =require("../models/orderModel");

function Access (res){
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
}

const getAllOrders = async (req, res) => {
    const orders = await orderModel.find({})
    Access(res);
    res.status(200).send(orders);
    }

    const getOrderByUserId = async(req, res) => { 
        const {id} = req.params; 
        //console.log("hi"+id); 
        const orderById =await orderModel.find({userId:id}) 
       // console.log(orderById ); 
        Access(res); 
        res.status(200).send(orderById); 
    }
const getOrderById = async(req, res) => {
        const {id} = req.params;
        //console.log("hi"+id);
        const orderById =await orderModel.findById(id)
       // console.log(orderById );
        Access(res);
        res.status(200).send(orderById);
    }
    const editOrder =async (req, res, next) => {
        try{
        const  {id}= req.params;
        const {orderStatus} = req.body;
        const updatedOrder = await orderModel.findByIdAndUpdate(id, {orderStatus},{new:true});
        Access(res);
        res.status(204).send(updatedOrder);
        }catch(error){
            next(error);
        }
    }


    const deleteOrder = async (req, res, next) => {
        const { id } = req.params;
        orderModel.findByIdAndDelete( id , function (err) {
            if (err) return handleError(err);
          });
          Access(res);
        res.status(204).send();
    }

    const addOrder = async (req, res, next) => { 
        const {productIds,userId,orderDate,totalPrice} = req.body; 
        console.log(req.body) 
        var newOrder = await orderModel.create({productIds,userId,orderStatus:"pending",orderDate,totalPrice}); 
        Access(res); 
        res.status(200).send(newOrder); 
    };
module.exports={
        getAllOrders,
        getOrderById,
        editOrder,
        deleteOrder,
        addOrder,
        getOrderByUserId  
    }


