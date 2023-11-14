const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const userRoute = require('./routes/user.routes');
const blogRoute = require('./routes/blog.routes');

async function connect() {
    await mongoose
        .connect(process.env.MONGO)
        .then((x) => {
            console.log(
                `Connected to Mongo! Database name: ${x.connections[0].name}`
            )
        })
        .catch((err) => {
            console.error("Error connecting to mongo", err.reason);
        });
}


const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),

);
app.use(cors());
app.use("/users", userRoute);
app.use("/posts", blogRoute);

// PORT
const port = process.env.PORT;
app.listen(port, () => {
    console.log("Connected to port", port);
});

// 404 Error
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
   });
   
app.use(function (err, req, res, next) {
     console.error(err.message, err);
     if (!err.status) err.status = 500;
     res.status(err.status).send(err.message);
})

