console.log("Front-end app.js online");

const express = require("express");
const path = require("path");
const debugLogger = require("../logger");

const { upload } = require("../backend/utils/cloudinary");

const app = express();
const PORT = process.env.PORT || 3050;
const API_URL = `http://localhost:${PORT}/api/`;

const log = debugLogger("Frontend");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("homepage");
});
app.get("/contact-us", (req, res) => {
    res.render("contact-us");
});
app.get("/inventory", async (req, res) => {
    log("(FRONT-END) GETTING ALL STOCK");
    const url = `${API_URL}stock`;
    try {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        log("FrontEnd has recived: " + JSON.stringify(data, null, 2));
        let model = { inventoryList: data.body };
        res.render("view-stock", model);
      });
  } catch (err) {
    console.error("Error fetching stock data:", err);
    res.status(500).send("Error fetching stock data");
  }
});
app.get("/modify-stock/:id", async (req, res) => {
  const stockId = req.params.id;
  const url = `${API_URL}stock/${stockId}`;
  try {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let model = { stock: data.body };
        res.render("modify-stock", model);
      });
  } catch (err) {
    console.error("Error fetching stock data:", err);
    res.status(500).send("Error fetching stock data");
  }
});
app.get("/create-stock", async (req, res) => {
  res.render("create-stock");
});

app.post("/update-stock-quantity/:id", async (req, res) => {
  //console.log(req);
  const requestBody = {
    _id: req.params.id,
    quantity: req.body.quantity,
  };
  let headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  };
  const url = `${API_URL}updateQuantity/${req.params.id}`;
  try {
    fetch(url, headers)
      .then((res) => res.json())
      .then((data) => {
        log(data);
        res.redirect("/modify-stock/" + req.params.id);
      });
  } catch (err) {
    console.error("Error updating stock data:", err);
    res.status(500).send("Error updating stock data");
  }
});
app.post("/create-stock", upload.single("image"), async (req, res) => {
  try {
    // If a file was uploaded, req.file.path is the Cloudinary URL (set by multer-storage-cloudinary)
    const imageUrl = req.file ? req.file.path : null;

    const stockResponse = await fetch(`${API_URL}createStock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stock_name: req.body.stock_name,
        quantity: req.body.quantity,
        min_to_restock: req.body.min_to_restock,
        description: req.body.description,
        imageUrl: imageUrl,
      }),
    });

    const stockData = await stockResponse.json();
    log(stockData);
    res.redirect("/inventory");
  } catch (err) {
    console.error("Error creating stock data:", err);
    res.status(500).send("Error creating stock data");
  }
});

module.exports = app;
