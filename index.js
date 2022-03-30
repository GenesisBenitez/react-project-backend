const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//routes
const productRoutes = require('./productRoutes/productRoutes');
const userRoutes = require('./userRoutes/userRoutes');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.listen(port, ()=>{
    console.log(`app listening at port ${port}`)
});