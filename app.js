const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const bodyParser = require("body-parser");
const passport = require("passport");

mongoose 
    .connect(db, { userNewUrlParser: true })
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Listening on port ${port}`)});


