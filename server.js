//starting the server

//importing the app
const app = require("./app");
const dotenv = require("dotenv");

//load the env variable
dotenv.config({path : "./config/config.env"});

//start the server
app.listen(process.env.PORT, ()=>{
    console.log(`Server started on PORT : ${process.env.PORT}`);
})