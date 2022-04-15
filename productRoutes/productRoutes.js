const express = require("express");
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllProducts", (request, response)=>{
    db.query("select * from products", (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getAllProductCategories", (request, response)=>{
    db.query("select * from product_category", (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getProduct/:id", (request, response)=>{
    db.query(`select products.id, products.name, products.description, products.category_id, 
    products.price, products.quantity, products.product_img, product_category.name AS category
    from products 
    inner join product_category on products.category_id = product_category.id where products.id = ?`, [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.post("/addProduct", (request, response)=>{
    db.query(`insert into products(name, description, category_id, price, quantity, product_img)values (?, ?, ?, ?, ? , ?)`, [request.body.name,request.body.description,request.body.category_id,request.body.price, request.body.quantity,request.body.product_img ], (err, results)=>{
        if(err) throw err;
        response.send("Product successfully added");
    })
})

router.post("/addProductCategory", (request, response)=>{
    db.query(`insert into product_category(name, description)values (?, ?)`, [request.body.name,request.body.description ], (err, results)=>{
        if(err) throw err;
        response.send("Product Category successfully added");
    })
})


//join queries
router.get("/getAllProductInformation", (request, response)=>{
    db.query(`select products.id, products.name, products.description, products.category_id, 
    products.price, products.quantity, products.product_img, product_category.name AS category
    from products 
    inner join product_category on products.category_id = product_category.id`, (err, results)=>{
        if(err) throw err;
        response.send({username: request.session.username, userId: request.session.userId,products: results});
})
})

router.get('/getProductCategories',(request, response)=>{
    db.query(`select * from product_category`, (err, results)=>{
        if(err) throw err;
        response.send(results);
})
})

router.get('/getProductsByCategory/:id',(request, response)=>{
    db.query(`select * from products where category_id = ?`,[request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
})
})

router.get('/getProductsByPrice/:id',(request, response)=>{
    db.query(`select * from products where price < ?`,[request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
})
})
module.exports = router;