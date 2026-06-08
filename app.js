//work-configure express and middleware


//import packages, we use require()
const express = require("express");
//create express app
const app = express();
//configure the middleware // middleware is the function that runs between request and response
// req -> middleware -> route -> response
const cors = require("cors");
//enabling middlewares
app.use(cors());
app.use(express.json()); //server cannot read json request body if we remove these
//export the app
module.exports = app;