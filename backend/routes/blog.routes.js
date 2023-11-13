let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let hasher = require('../hasher');

const blogSchema = require('../Models/Blog');


router.route("/create-post").post(async (req, res, next) => {
    await blogSchema
        .create(req.body)
        .then(result => {
            res.json({
                data: result,
                message: 'Blog Created',
                status:200
            });
        })
        .catch(err => {
            return next(err);
        });
});

router.route("/display-post").get(async (req, res, next) => {
    await blogSchema
        .find()
        .then(result => {
            res.json({
                data: result,
                message: 'Blogs Fetched',
                status:200
            });
        })
        .catch(err => {
            return next(err);
        });
});

router.route("/view/:id").get(async (req, res, next) => {
    await blogSchema
        .findById(req.params.id)
        .then(result => {
            res.json({
                data: result,
                message: "Fetched Successfully",
                status: 200,
            })
        })
        .catch(err => {
            return next(err)
        })
})
module.exports = router;