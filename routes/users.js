const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/user")

router.get("/login", function (req, res) {
    res.render("login");
});
router.get("/register", function (req, res) {
    res.render("register");
});

router.post("/register", function(req, res){
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Requerir campos obrigatórios

    if(!name || !email || !password || !password2){
        errors.push({msg: "Por favor, preencha todos os campos!"})
    }

    if(password!==password2){
        errors.push({msg: "As senhas não são as mesmas!"});
    }

    if(password.length < 6){
        errors.push({msg: "A senha deve ter pelo menos 6 caracteres!"});
    }

    if(errors.length>0){
        res.render("register", {
           errors,
           name,
           email,
           password,
           password2 
        });
    }else{
        User.findOne({email: email})
        .then(user => {
            if(user){
                errors.push({msg: "Email já está registrado!"});
                res.render("register", {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });
                //Hash senha
                bcrypt.genSalt(10, (err, salt)=> 
                    bcrypt.hash(newUser.password, salt, (err, hash)=> {
                      if(err) throw err;  
                      //Transformar o password em hash
                      newUser.password = hash;
                      //Salvar o usuário no banco
                      newUser.save()
                      .then(user=>{
                          req.flash("success_msg", "Você está registrado e pode logar!");
                          res.redirect("login");
                      })
                      .catch(err => console.log(err));
                }))
                console.log(newUser);
            }
        });
    }
});

module.exports = router;