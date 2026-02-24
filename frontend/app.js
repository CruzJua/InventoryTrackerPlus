console.log("Front-end app.js online");

const express = require('express');
const path = require('path');
const debugLogger = require('../logger');

const app = express();
const PORT = process.env.PORT || 3050;
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
app.get("/modify-stock/:id", async (req, res) =>{
    const stockId = req.params.id;
    const url = `${API_URL}stock/${stockId}`;
    try{
        fetch(url)
        .then(res => res.json())
        .then (data =>{
            let model = {stock: data.body};
            res.render("modify-stock", model);
        });
    }catch(err){
            console.error("Error fetching stock data:", err);
            res.status(500).send("Error fetching stock data");
    }
});

app.post("/update-stock-quantity/:id", async (req, res) =>{
    //console.log(req);
    const requestBody = {
        _id: req.params.id,
        quantity: req.body.quantity
    };
    let headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }
    const url = `${API_URL}updateQuantity/${req.params.id}`;
    try{
        fetch(url, headers)
        .then(res => res.json())
        .then (data =>{
            log(data);
            res.redirect("/modify-stock/" + req.params.id);
        });
    }
    catch(err){
        console.error("Error updating stock data:", err);
        res.status(500).send("Error updating stock data");
    }
});


module.exports = app;