const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//routes
const sellerRoutes = require('./sellerRoutes/sellerRoutes');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/sellers', sellerRoutes);

app.listen(port, ()=>{
    console.log(`app listening at port ${port}`)
});