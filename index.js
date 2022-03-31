const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");

//routes
const productRoutes = require('./productRoutes/productRoutes');
const userRoutes = require('./userRoutes/userRoutes');
const authRoutes = require('./authRoute/auth');


const app = express();
const port = 8080;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));
app.use(session({
    secret: "secret",
    resave: "true",
    saveUninitialized: "true"
}))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/', authRoutes);

app.listen(port, ()=>{
    console.log(`app listening at port ${port}`)
});