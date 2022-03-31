const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllProducts", (request,response) =>{
    db.query("select * from products", (err,results) =>{
            if(err) throw err;
            response.send(results);
        })
    
});

router.get("/getProduct/:id", (request,response) =>{
    db.query("select * from products where id = ?",[request.params.id], (err,results) =>{
        if(err) throw err;
        response.send(results);
    })
});

router.post("/addProduct", (request,response)=>{
    db.query(`insert into products(name,description,category_id,price)values(?,?,?,?)`, [request.body.name,request.body.description, request.body.category_id,request.body.price], (err,results) =>{
        if(err) throw err;
        response.send("Product successfully added");
    })
});

//join queries
router.get("/getAllProductInformation", (request,response) =>{
    if(request.session.loggedin){
    db.query(`select products.name, products.description, products.category_id, 
    products.price, products.quantity, product_category.name AS category
    from products 
    inner join product_category on products.category_id = product_category.id`, (err,results) =>{
        if(err) throw err;
        response.send({username: request.session.username, userId: request.session.userId,products: results});
    })
}else{
        response.sendStatus(401);
        response.send("User not authorized");
    }
})

module.exports = router;