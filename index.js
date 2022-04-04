const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");

//routes
const productRoutes = require('./productRoutes/productRoutes');
const userRoutes = require('./userRoutes/userRoutes');
const authRoutes = require('./authRoute/auth');
const cartRoutes = require('./cartRoutes/cartRoutes');

const app = express();
const port = 8080;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
    credentials: true
}));
app.use(session({
    secret: "secret",
    resave: "true",
    saveUninitialized: "true"
}))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/', authRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);

app.listen(port, ()=>{
    console.log(`app listening at port ${port}`)
});