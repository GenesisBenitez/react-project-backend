const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllSellers", (request,response) =>{
    db.query("select * from seller", (err,results) =>{
        if(err) throw err;
        response.send(results);
    })
});

router.get("/getSeller/:id", (request,response) =>{
    db.query("select * from seller where id = ?",[request.params.id], (err,results) =>{
        if(err) throw err;
        response.send(results);
    })
});

router.post("/register", (request,response)=>{
    db.query(`insert into seller
    (firstname,lastname,username,password,description,street_address,city,state,country)
    values(?,?,?,?,?,?,?,?,?)`, [request.body.firstname,request.body.lastname, request.body.username,request.body.password,request.body.description,request.body.street_address,request.body.city,request.body.state,request.body.country], (err,results) =>{
        if(err) throw err;
        response.send("User successfully registered");
    })
})

module.exports = router;