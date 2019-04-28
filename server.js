const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const request = require("request");
const port = process.env.PORT || 3000;
const app = express();

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Body Parser
app.use(bodyParser.urlencoded({extended: true}));

//Rotas
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(port, () => {
    console.log("Node Server running on port "+port);
});
