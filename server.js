import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// import bodyParser from 'body-parser';
import config from './config.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import uploadRoute from './routes/uploadRoute.js';

const mongodbUrl = "mongodb://127.0.0.1/bamazon";
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  mongoose.connection.on('connected',()=>{
    console.log('connected to db')
  })
  mongoose.connection.on('error',(err)=>{
    console.log('err connecting', err)
  })

const app = express();
app.use(express.json());
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
// app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.use(express.static("frontend/build"));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});
app.listen(config.PORT, () => {
  console.log('Server is running on port: ', config.PORT);
});


// nodemon --watch backend --exec babel-node backend/server.js
