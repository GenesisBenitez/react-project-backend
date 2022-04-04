const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllCarts", (request,response) =>{
    db.query("select * from cart", (err,results) =>{
            if(err) throw err;
            response.send(results);
        })
    
});

router.get("/getCartByUserId/:user_id", (request,response) =>{
    db.query(`
    select cart.id, cart.quantity, products.id AS product_id, products.name, 
    product_category.name AS category, products.price, products.product_img, 
    products.price*cart.quantity AS total_price
    from cart 
    inner join products on cart.product_id = products.id
    inner join product_category on products.category_id = product_category.id where user_id = ?`,[request.params.user_id], (err,results) =>{
        if(err) throw err;
        response.send(results);
    })
});

router.get("/getTotalCostForCart/:user_id", (request,response) =>{
    db.query(`select sum(products.price*cart.quantity) AS total_cost_in_cart
    from cart 
    inner join products on cart.product_id = products.id where user_id = ?`,[request.params.user_id], (err,results) =>{
        if(err) throw err;
        response.send(results);
    })
});

router.post("/addProductToCart", (request, response)=>{

    db.query(`select id AS in_cart from cart where user_id = ? and product_id = ?`, [request.body.user_id, request.body.product_id], (err, results)=>{
        if(err) throw err;
        if(results.length > 0){
            db.query(`update cart set quantity = quantity + ? where user_id = ? AND product_id = ?`, [request.body.quantity, request.body.user_id, request.body.product_id], (err, results)=>{
                response.send("Cart item successfully updated");
            })
        
    }else{
            db.query(`insert into cart (user_id, product_id,quantity) values (?, ?, ?)`, [request.body.user_id,request.body.product_id,request.body.quantity ], (err, results)=>{
                if(err) throw err;
                response.send("Cart item successfully added");
            })
    }
    })
    
})

 router.delete("/deleteCartItem/:id", (request,response)=>{

    db.query(`delete from cart where id = ?`,[request.params.id], (err,results) =>{
        if(err) throw err;
        response.send("Cart item successfully deleted");
    })
})
  


//join queries



module.exports = router;