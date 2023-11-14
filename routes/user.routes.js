let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let hasher = require('../hasher');
const bcrypt = require('bcrypt');

const userSchema = require('../Models/User');

router.route("/signin").post(async (req, res, next) => {
    await userSchema
        .find({username: req.body.username})
        .then(result => {
            console.log(result[0]);
            if (result[0] != undefined) {
                bcrypt.compare(req.body.password, result[0].password, function(err, same) {
                    if (same) {
                        res.json({
                            data: result,
                            message: "Successfully Logged In.",
                            status: 200
                        });
                    } else {
                        res.json({
                            data: ['Incorrect Password'],
                            message: "The password was incorrect.",
                            status: 200
                        });
                    }
                });
            } else {
                res.json({
                    data: ['Username Not Found'],
                    message: "The username did not match any in the database.",
                    status: 200
                })
            }
            
        })
        .catch((err) => {
            return next(err);
        });
});
router.route("/signup").post(async (req, res, next) => {
    await userSchema
        .create({...req.body,password: await hasher.Hash(req.body.password)})
        .then(result => {
            res.json({
                data: result,
                message: "Account created.",
                status:200
            });
        })
        .catch((err) => {
            return next(err);
        });   
});

router.route("/access-users").post(async (req, res, next) => {
    console.log(req.body);
    await userSchema
        .find({username: req.body.username})
        .then(result => {
            res.json({
                data: result,
                message: "Fetched Possible Accounts",
                status: 200,
            })
        })
        .catch(err => {
            return next(err);
        })
})

module.exports = router;