const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Import Routes for API
const authRoute = require("./routes/auth");
const postRoute = require("./routes/recipes");
const usersRoute = require("./routes/users");
const sessionRoute = require("./routes/session");

//Connect to DB using connection string in .env
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}, () =>
  console.log("The database has been connected to!")
);

//Middleware
app.use(express.json());

//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", usersRoute);
app.use("/api/session", sessionRoute);

app.listen(3000, () => console.log("The API is now live!"));
