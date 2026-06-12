//work-configure express and middleware


//import packages, we use require()
const express = require("express");
//create express app
const app = express();
//configure the middleware // middleware is the function that runs between request and response
// req -> middleware -> route -> response

const auth = require("./routes/auth")
const restaurant = require("./routes/restaurant")
const cors = require("cors");
//enabling middlewares
app.use(cors());
app.use(express.json()); //server cannot read json request body if we remove these
app.use("/api/v1/users", auth)
app.use("/api/v1/eats/stores", restaurant)
//export the app
module.exports = app;