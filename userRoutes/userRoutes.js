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
    db.query("select username, first_name, last_name from users where id = ?",[request.params.id], (err,results) =>{
        if(err) throw err;
        response.send(results);
    })
});

router.get("/getUserInformation/:id", (request,response) =>{
    if(request.session.loggedin){
    db.query(`
    select users.username, users.first_name, users.last_name, 
    user_address.street_address, user_address.city, user_address.postal_code, user_address.country, 
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


module.exports = router;