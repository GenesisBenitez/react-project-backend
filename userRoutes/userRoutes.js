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
    db.query("select * from users where id = ?",[request.params.id], (err,results) =>{
        if(err) throw err;
        response.send(results);
    })
});

router.post("/registerUser", (request,response)=>{
    db.query(`insert into users(username, password,first_name,last_name) values(?, ?, ?, ?)`, [request.body.username,request.body.password, request.body.first_name,request.body.last_name], (err,results) =>{
        if(err) throw err;
        response.send("User successfully added");
    })
});


module.exports = router;