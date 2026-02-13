console.log("Front-end app.js online");

const express = require('express');
const app = express();
const PORT = 3050;
const API_PORT = 2050;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, resp) =>{
    resp.render('homepage');
});
app.get("/contact-us", (req, resp) =>{
    resp.render('contact-us')
});
app.listen(PORT, () =>{
    console.log(`Express running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
});