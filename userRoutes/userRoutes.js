const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllUsers", (request,response) =>{
    db.query("select * from users", (err,results) =>{
        if(err) throw err;
        response.send(results);
    })
});

router.get("/getUser/:id", (request,response) =>{
    db.query("select username, first_name, last_name, created_at from users where id = ?",[request.params.id], (err,results) =>{
        if(err) throw err;
        response.send(results);
    })
});

router.get("/getUserAddress/:id", (request,response) =>{
    db.query("select user_id, street_address, city,postal_code,country,state from user_address where user_id = ?",[request.params.id], (err,results) =>{
        if(err) throw err;
        response.send(results);
    })
});

router.get("/getUserInformation/:id", (request,response) =>{
    if(request.session.loggedIn){
    db.query(`
    select users.username, users.first_name, users.last_name, users.created_at,
    user_address.street_address, user_address.city, user_address.state, user_address.postal_code, user_address.country, 
    user_payment.payment_type, user_payment.account_number, user_payment.expiry
    from users 
    inner join user_address on users.id = user_address.user_id
    inner join user_payment on users.id = user_payment.user_id where users.id = ?`,[request.params.id], (err,results) =>{
        if(err) throw err;
        response.send(results);
        })
    }else{
        response.send({"Status": "User not authorized"})
    }
});

router.post("/registerUser", (request,response)=>{
    db.query(`insert into users(username, password,first_name,last_name) values(?, ?, ?, ?)`, [request.body.username,request.body.password, request.body.first_name,request.body.last_name], (err,results) =>{
        if(err) throw err;
        response.send("User successfully added");
    })
});

router.post("/registerUserAddress", (request,response)=>{
    db.query(`insert into user_address(user_id, street_address, city,postal_code,country,state) values(?, ?, ?, ?,?,?)`, [request.body.user_id,request.body.street_address, request.body.city,request.body.postal_code,request.body.country,request.body.state], (err,results) =>{
        if(err) throw err;
        response.send("User successfully registered");
    })
});

router.post("/registerUserPayment", (request,response)=>{
    db.query(`insert into user_payment(user_id,payment_type,account_number,expiry) values(?, ?, ?,?)`, [request.body.user_id,request.body.payment_type, request.body.account_number,request.body.expiry], (err,results) =>{
        if(err) throw err;
        response.send("User payment successfully added");
    })
});

router.get("/getUserPayment/:id", (request,response) =>{
    db.query("select * from user_payment where user_id = ?",[request.params.id], (err,results) =>{
        if(err) throw err;
        response.send(results);
    })
});

module.exports = router;