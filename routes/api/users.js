const express = require("express");

const router = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../../models/User');

const keys = require("../../config/keys");

const jwt = require("jsonwebtoken");

const passport = require("passport");

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get("/test", (req, res) => {
    res.json({msg: "This is the user route" });
});

router.get(
    "/current", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // res.send(req.user);
        res.json({
            id: req.user.id, 
            handle: req.user.handle, 
            email: req.user.email,
            pokemon: req.user.pokemon
        });
    })


router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: "A user is already registered with that email" })
            } else {
                const newUser = new User({
                    handle: req.body.handle,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then((user) => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
                // newUser.save().then(user => res.send(user)).catch(err => res.send(err));
            }
        })
})  

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: "This user does not exist." });
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            // handle: user.handle,
                            // email: user.email
                            name: user.name
                        };
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );
                        //res.json({ msg: "Success!"});
                    } else {
                        return res.status(400).json({ password: "Incorrect password" });
                    }
                })
        })
})

module.exports = router;

