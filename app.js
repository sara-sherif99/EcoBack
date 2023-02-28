// Express 
const express = require('express')
const mongoose = require('mongoose');
const usersRouter = require('./routers/usersRouter');
const productsRouter = require('./routers/productsRouter');
const ordersRouter = require('./routers/ordersRouter');
const adminRouter = require("./routers/adminRouter");
//const imagesRouter = require('./routers/imagesRouter');
const categoriesRouter = require('./routers/categoriesRouter');
const app = express()
var cors = require('cors');

var bodyParser = require('body-parser');

require('dotenv/config');



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('./uploads'));

// Set EJS as templating engine
app.set("view engine", "ejs");




const port = process.env.PORT || '3000';
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use('/user', usersRouter);
app.use('/product', productsRouter);
app.use('/order', ordersRouter);
app.use("/admin", adminRouter);
app.use('/category', categoriesRouter);


app.get('/', (req, res) => {
  res.send('Hello World!')
})


mongoose.connect('mongodb://127.0.0.1:27017/eco').then(() => {
  console.log("connected to databse succesfully")
});

// mongoose.connect("mongodb+srv://ecofriendly:eco-sahabanaal@alaa.vk08e4j.mongodb.net/ECO?retryWrites=true&w=majority").then( ()=> {
//     console.log("connected to databse succesfully")
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})








