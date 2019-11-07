// // Quick exercise
// // Working on a login panel from my Bananaplate project
// // http://dribbble.com/iamnbutler/projects/178899-BANANAPLATE

// // $(document).ready(function(){
// //     // No links pls
// //     $('.ui-button.inactive').click(function(){
// //       e.preventDefault();
// //     });
    
// //     $('#close').click(function(){
// //       $('.ui-panel').removeClass('bounceInDown').addClass('bounceOutUp');
// //     });
// //   });

// var express = require('express');
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// var session = require('express-session');
// var MongoStore = require('connect-mongo')(session);

// //connect to MongoDB
// // mongoose.connect('mongodb+srv://admin:admin@cluster0-trppp.mongodb.net/test?retryWrites=true&w=majority');
// var db = mongoose.connection;

// //handle mongo error
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   // we're connected!
// });
// var app = express();

// //use sessions for tracking logins
// app.use(session({
//   secret: 'work hard',
//   resave: true,
//   saveUninitialized: false,
//   store: new MongoStore({
//     mongooseConnection: db
//   })
// }));

// // parse incoming requests
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));


// // serve static files from template
// app.use(express.static(__dirname + '/templateLogReg'));

// // include routes
// var routes = require('./routes/router');
// app.use('/', routes);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('File Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// // define as the last app.use callback
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.send(err.message);
// });


// // listen on port 3000
// app.listen(3000, function () {
//   console.log('Express app listening on port 3000');
// });
const express = require("express"); //import express
const bodyParser = require("body-parser");
const app = express(); //create an express app
const cors = require("cors");
const mongoose = require("mongoose");
const messageModel = require("./models/message")
const loginModel = require("./models/login")

const connectionString = "mongodb+srv://admin:admin@cluster0-trppp.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(
    connectionString,
    {userNewUrlPaser: true, useUnifiedTopology: true},
    err => {
        console.log(err);
    }
);
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/contact-us", (req, res) => {
    const message = new messageModel({
        fullname: req.body.fullname,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
    });

    message.save((err, doc) => {
        if (err !== null) {
            console.log(err);
            res.send("failed to contact form. please try again.");
        } else {
            console.log(doc);
            res.send("thanks for reaching out. We will contact you shortly!");
        }
    });
});

app.post("/login", (req, res) => {
    const login = new loginModel({
        username: req.body.username,
        password: req.body.password,
    });

    login.save((err, doc) => {
        if (err !== null) {
            console.log(err);
            res.send("username or password not correct.");
        } else {
            console.log(doc);
            res.send("login successful");
        }
    });
});


// app.post('/login', (req, res) =>
// {
//     if (req.body.username === user.username &&
//         req.body.password === user.password) {
//         res.send('login successful')
//     } else {
//         res.send('Username or password is incorrect')
//     }
// });
// login.save((err, doc) => {
//     if (err !== null) {
//         console.log(err);
//         res.send("login unsuccessful.");
//     } else {
//         console.log(doc);
//         res.send("login successful");
//     }
// });





app.get('/store', (req, res) => {
    res.send({result: store, message: "result is seccessful" });
});

app.get("/", (req, res) => {
    res.send("Hello World");
});//create a route

app.get("/colors", (req, res) => {
    res.send(["blue", "red", "green", "pink", "black"])
})

// app.post("/login", (req, res) => {
//     console.log(req.body);
//     res.send(`Login successful`);
// });


// const user = {
//     username:'admin',
//     password:'west'
// }

app.listen(4000, () => console.log("server running at port 4000")); //expose the app on port 4000

// mongodb+srv://admin:<password>@cluster0-trppp.mongodb.net/test?retryWrites=true&w=majority
