console.log("Front-end app.js online");

const express = require('express');
const path = require('path');
const debugLogger = require('../logger');

const app = express();
const PORT = process.env.PORT || 3050;
//Works locally, I am unsure if this will work when we deploy
const API_URL = `http://localhost:${PORT}/api/`

const log = debugLogger("Frontend");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) =>{
    res.render('homepage');
});
app.get("/contact-us", (req, res) =>{
    res.render('contact-us')
});
app.get("/inventory", async (req, res) =>{
    log("(FRONT-END) GETTING ALL STOCK");
    const url = `${API_URL}stock`;
    try{
        fetch(url)
        .then(res => res.json())
        .then (data =>{
            log("FrontEnd has recived: " + JSON.stringify(data, null, 2));
            let model = {inventoryList: data.body};
            res.render("view-stock", model);
        });
    }catch(err){
        console.error("Error fetching stock data:", err);
        res.status(500).send("Error fetching stock data");
    }
    
});



module.exports = app;