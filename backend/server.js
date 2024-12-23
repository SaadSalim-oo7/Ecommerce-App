const express = require('express');
const app = express();
const port = 8000;
const router = require('./Views/userRoutes');
const productRoutes = require('./Views/productRoutes')
const mongoose = require('mongoose');
const cors = require('cors')

app.get('/', (req, res) => {
    res.send('Hello')
})

app.use(cors())
app.use(express.json())

app.use(productRoutes);
app.use(router);

mongoose.connect('mongodb://127.0.0.1:27017/Ecom-users')
.then( () => {
    console.log('Db connected');
}).catch( () => {
    console.log('Db connection failed');
    
})

app.get('*', (req,res) => {
    return res.send('Request is not handeled on backend')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})