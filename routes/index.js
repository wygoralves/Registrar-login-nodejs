const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");


router.get("/", function(req, res){
    res.render("index");
})
router.get("/colorgame", ensureAuthenticated, (req, res) => 
    res.render("colorgame",{
        name: req.user.name
    }));

module.exports = router;