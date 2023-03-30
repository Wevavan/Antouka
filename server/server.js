const express = require('express');
const dotenv = require('dotenv');
const connectDataBase = require('./config/MongoDb');
const Importdata = require('./Dataimport');
const ProductRoutes = require('./Routes/ProductRoutes');
const { notFound, errorHandler } = require('./Middleware/Errors');
const UserRoutes = require('./Routes/UserRoutes');
const bodyParser = require('body-parser');
const OrderRoutes = require('./Routes/OrderRoutes');
const TopProductRoutes = require('./Routes/TopProductRoutes');
const ProductDuMomentRoutes = require('./Routes/ProductDuMomentRoutes');


const app = express();
dotenv.config();
connectDataBase();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API
app.use("/api/import", Importdata);
app.use("/api/products", ProductRoutes);
app.use("/api/topproducts", TopProductRoutes);
app.use("/api/productsdumoment", ProductDuMomentRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/orders", OrderRoutes);
app.get("/api/config/paypal", (req,res) =>{
    res.send(process.env.PAYPAL_CLIENT_ID);
});

// API ERRORS HANDLER
app.use(notFound);
app.use(errorHandler);


app.get('/', (req,res)=>{
    res.send('APP IS RUNNING');
})

const PORT = process.env.PORT || 1000;


app.listen(PORT, console.log(`Server is running in port ${PORT}`));