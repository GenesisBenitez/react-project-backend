const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllOrders", (request,response) =>{
    db.query("select * from orders", (err,results) =>{
            if(err) throw err;
            response.send(results);
        })
    
});

router.get("/getOrdersByUserId/:user_id", (request,response) =>{
    db.query(`
    select orders.created_at, orders.id, orders.total, orders.quantity,
products.name,products.id AS product_id, products.price, products.product_img,
user_payment.id, user_payment.payment_type, user_payment.account_number,
users.first_name, users.last_name
from orders 
inner join products on orders.product_id = products.id
inner join user_payment on orders.user_payment_id = user_payment.id
inner join users on orders.user_id = users.id where orders.user_id = ?`,[request.params.user_id], (err,results) =>{
        if(err) throw err;
        response.send(results);
    })
});


router.post("/addOrder", (request, response)=>{
            db.query(`insert into orders(user_id,product_id,total,quantity, user_payment_id)values (?, ?, ?,?,?)`, [request.body.user_id,request.body.product_id,request.body.total,request.body.quantity, request.body.user_payment_id ], (err, results)=>{
                if(err) throw err;
               
            })
            db.query(`update products set quantity = quantity - ? where id = ?`, [request.body.quantity,request.body.product_id], (err, results)=>{
                if(err) throw err;
                
            })
            db.query(`delete from cart where user_id = ?`, [request.body.user_id], (err, results)=>{
                if(err) throw err;
               
            })
            response.send("Order successfully added, Product quantity successfully updated, Cart item successfully removed");
})



module.exports = router;