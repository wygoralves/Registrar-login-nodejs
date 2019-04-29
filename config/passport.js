const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load User Model

const User = require("../models/user");

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: "email"}, (email, password, done)=>{
            //Verificar se o usuário existe
            User.findOne({email:email})
            .then(user => {
                if(!user){
                    return done(null, false, {message: "Esse email não está registrado!"});
                }
                //Verificar a senha
                bcrypt.compare(password, user.password, (err, isMatch) =>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user);
                    }else{
                        return done(null, false, {message: "Senha incorreta!"});
                    }
                });
            })
            .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}