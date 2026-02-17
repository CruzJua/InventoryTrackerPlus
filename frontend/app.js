console.log("Front-end app.js online");

const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, resp) =>{
    resp.render('homepage');
});
app.get("/contact-us", (req, resp) =>{
    resp.render('contact-us')
});
app.get("/inventory", (req, resp) =>{
    resp.render('view-stock')
});


module.exports = app;