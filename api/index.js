const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/recipes');
const usersRoute = require('./routes/users');

//Connect to DB
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },() => console.log('The database has been connected to!'));

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/users', usersRoute);

app.listen(5000, () => console.log('The website is now live!'));