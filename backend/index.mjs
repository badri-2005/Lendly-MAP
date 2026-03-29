import express from 'express';
import connection from './db/db.mjs';
import { signup, login, updateProfile, getProfile } from './controllers/login.mjs';
import cors from 'cors';
import {getusers} from './controllers/users.mjs';
import { uploadImage } from './controllers/photoupload.mjs';
import upload from './middleware/upload.mjs'
import { getProducts, getProductById } from "./controllers/productfetch.mjs";


const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:8080",
    credentials: true

}));


const PORT = 3000;

// API to check if the server is running
app.get('/',(req,res)=>{
    res.send('Server is running');
    console.log('Health Route');
})

// API for User Signup
app.post('/api/signup',signup);

// API for User Login
app.post('/api/login',login);

// API for creating user profile
app.put('/api/profile', updateProfile);

// API for getting user profile
app.get('/api/profile/:username', getProfile);

// API for getting all users
app.get('/api/users', getusers);

// API for uploading product image
app.post('/api/upload',upload.single('image'),uploadImage);

// Get all products
app.get("/api/products", getProducts);

// Get product by id
app.get("/api/products/:id", getProductById);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})