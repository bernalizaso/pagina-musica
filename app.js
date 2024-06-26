const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv"); 
const path = require("path")
const app = express();
dotenv.config({path:`./.env`});
const db= mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});
app.set("view engine", "hbs");
const publicDirectory = path.join(__dirname,"./public")
app.use(express.static(publicDirectory))
db.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("mysql conectado...")
    }
})



//especie de parseo  de los json y los url
app.use(express.urlencoded({ extended: false}));
app.use(express.json()); 
//Uso de controller y rutes
app.use('/', require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

app.listen(3000, ()=>{
    console.log("server encendido en 3000");
})

