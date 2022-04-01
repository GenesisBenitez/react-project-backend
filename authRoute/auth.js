const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getLoggedInUser", (request,response)=>{
    if(request.session.loggedin){
        response.send({username: request.session.username, userId: request.session.userId})
    }else{
        response.send({Status: "User not authorized"});
    }
})

router.post("/login", (request,response)=>{
    let username = request.body.username;
    let password = request.body.password;
    if(username && password){
        db.query(`select * from users where username = ? AND password = ?`, [username, password], (err,results) =>{
            if(err) throw err;
            if(results.length > 0){
            request.session.loggedin = true;
            request.session.username = username;
            console.log(results[0]);
            if(results != undefined){
                request.session.userId = results[0].id; 
            }            
            response.end("User Successfully logged in!");
         }else{
            response.send("User not authorized");
            }
        })
    }
    
});


module.exports = router;