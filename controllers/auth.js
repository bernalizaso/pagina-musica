const mysql = require("mysql");
const jwt = require ("jsonwebtoken")
const bcrypt = require("bcryptjs")
const cookies = require ("cookie-parser")



const db= mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

exports.register = (req,res) => {
    console.log(req.body);

    const UserName = req.body.UserName;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const PasswordConfirmation = req.body.PasswordConfirmation;

    db.query("SELECT email FROM users WHERE email = ?",[Email],async (error,results)=>{
        if(error){
            console.log(error);
        }
        if( results.length > 0){
            return res.render("register",{
                message: "el email ya fue registrado"
            })
        }
        else if( Password !== PasswordConfirmation){
            return res.render("register",{
                message: "la contraseña y su confirmacion no coinciden"
            });
        }

        let PasswordHasheada = await bcrypt.hash(Password,8);
        console.log(PasswordHasheada);

        db.query("INSERT INTO users SET ?", {name:UserName, email : Email, password : PasswordHasheada}, (error,results)=>{
            if(error){
                console.log(error);
            }
            else{
                return res.render("register",{
                message: "usuario registrado"});
            }
        })
    })

   
}