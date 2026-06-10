//starting the server

//importing the app
const app = require("./app");
const connectDatabase = require("./config/database")
const dotenv = require("dotenv");

//load the env variable
dotenv.config({path : "./config/config.env"});

//connect to db
connectDatabase();

//start the server
app.listen(process.env.PORT, ()=>{
    console.log(`Server started on PORT : ${process.env.PORT}`);
})