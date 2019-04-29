const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");

const port = process.env.PORT || 3000;
const app = express();

//MongoDB
const db = require("./config/keys").MongoURI;
mongoose.connect(db, { useNewUrlParser:true })
    .then(()=> console.log("Banco MongoDB conectado!"))
    .catch(err => console.log(err));
//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Body Parser
app.use(express.urlencoded({extended: false}));

//Express Session
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

//Connect flash
app.use(flash());

//Vars globais
app.use(function(req, res, next){
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
})

//Rotas
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(port, () => {
    console.log("Node Server running on port "+port);
});
