const express = require("express");
const app = express();
const path = require("path");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");


const { upload } = require("./utils/cloudinary");
const { dal } = require("./mongoDAL");
const debugLogger = require("../logger");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory Tracker Plus API",
      version: "1.0.0",
      summary: "API layer for Inventory Tracker Plus",
    },
  },
  servers: [
    {
      url: "/api",
      description: "API layer for Inventory Tracker Plus",
    },
  ],
  apis: [path.join(__dirname, "app.js")],
};

const specs = swaggerJsdoc(options);

const log = debugLogger("Backend");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.redirect("/docs");
});

/**
 * @openapi
 * /stock:
 *   get:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         in: query
 *         required: false
 *         type: string
 *       - name: category
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: A list of stock docs
 */
app.get("/stock", async (req, res) => {
  log("(API) GETTING ALL STOCK");
  const dbName = req.query.dbName;
  if (!dbName) return res.status(400).json({ error: "dbName is required" });
  const filter = {};
  if (req.query.name)     filter.name = req.query.name;
  if (req.query.category) filter.category = req.query.category;
  try {
    const dalResponse = await dal.getAllStock(dbName);
    res.json({ code: 200, body: dalResponse });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch stock" });
  }
});

/**
 * @openapi
 * /stock/:id:
 *   get:
 *     summary: Get a single stock doc by ID
 *     responses:
 *       200:
 *         description: A single stock doc
 */
app.get("/stock/:id", async (req, res) => {
  const dbName = req.query.dbName;
  const _id = req.params.id;
  if (!dbName) return res.status(400).json({ error: "dbName is required" });
  try {
    const dalResponse = await dal.getSingleStock(dbName, _id);
    res.json({ code: 200, body: dalResponse });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch stock item" });
  }
});

/**
 * @openapi
 * /usage/:id:
 *   get:
 *     summary: Get a single usage doc by ID
 *     responses:
 *       200:
 *         description: A single usage doc
 */
app.get("/usage/:id", (req, res) => {
  // TODO: get the usage doc by its ID
  res.json(data);
});

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: A list of categories
 */
app.get("/categories", (req, res) => {
  // TODO: get all categories

  res.json(data);
});

/**
 * @openapi
 * /deleteUsage/:id:
 *   delete:
 *     summary: Delete a usage doc by ID
 *     responses:
 *       200:
 *         description: A single usage doc
 */
app.delete("/deleteUsage/:id", (req, res) => {
  // TODO: delete the usage doc by its ID
  res.json(data);
});

/**
 * @openapi
 * /deleteStock/:id:
 *   delete:
 *     summary: Delete a stock doc by ID
 *     responses:
 *       200:
 *         description: A single stock doc
 */
app.delete("/deleteStock/:id", (req, res) => {
  // TODO: delete the stock doc by its ID
  res.json(data);
});

/**
 * @openapi
 * /deleteCategory/:id:
 *   delete:
 *     summary: Delete a category doc by ID
 *     responses:
 *       200:
 *         description: A single category doc
 */
app.delete("/deleteCategory/:id", (req, res) => {
  // TODO: delete the category doc by its ID
  res.json(data);
});

/**
 * @openapi
 * /createStock:
 *   post:
 *     summary: Create a new stock doc
 *     responses:
 *       200:
 *         description: A single stock doc
 */
app.post("/createStock", async (req, res) => {
    try {
        const dbName = req.body.dbName;
        if (!dbName) return res.status(400).json({ error: "dbName is required" });
        const newStock = {
            stock_name: req.body.stock_name,
            quantity: req.body.quantity,
            min_to_restock: req.body.min_to_restock,
            description: req.body.description,
            imageUrl: req.body.imageUrl || null,
        };
        const dalResponse = await dal.createStock(dbName, newStock);
        res.json({ code: 200, body: dalResponse });
    }
    catch(err){
        console.error("Error creating stock data:", err);
        res.status(500).send("Error creating stock data");
    }
});

/**
 * @openapi
 * /createUsage:
 *   post:
 *     summary: Create a new usage doc
 *     responses:
 *       200:
 *         description: A single usage doc
 */
app.post("/createUsage", (req, res) => {
  // TODO: create a new usage doc
  res.json(data);
});

/**
 * @openapi
 * /createCategory:
 *   post:
 *     summary: Create a new category doc
 *     responses:
 *       200:
 *         description: A single category doc
 */
app.post("/createCategory", (req, res) => {
  // TODO: create a new category doc
  res.json(data);
});

/**
 * @openapi
 * /updateQuantity/:id:
 *   post:
 *     summary: Update quantity of doc by ID
 *     responses:
 *       200:
 *         description: A single stock doc
 */
app.post("/updateQuantity/:id", async (req, res) => {
  log("(API) ID TO UPDATE: " + req.params.id);
  const dbName = req.body.dbName;
  if (!dbName) return res.status(400).json({ error: "dbName is required" });
  let updatedStock = {
    _id: req.params.id,
    quantity: req.body.quantity,
  };
  try {
    const dalResponse = await dal.updateQuantity(dbName, updatedStock);
    res.json({ code: 200, body: dalResponse });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update quantity" });
  }
});

/**
 * @openapi
 * /updateUsage/:id:
 *   post:
 *     summary: Update a usage doc by ID
 *     responses:
 *       200:
 *         description: A single usage doc
 */
app.post("/updateUsage/:id", (req, res) => {
  // TODO: update the usage doc by its ID
  res.json(data);
});

/**
 * @openapi
 * /updateCategory/:id:
 *   post:
 *     summary: Update a category doc by ID
 *     responses:
 *       200:
 *         description: A single category doc
 */
app.post("/updateCategory/:id", (req, res) => {
  // TODO: update the category doc by its ID
  res.json(data);
});
/**
 * @openapi
 * /api/upload:
 *   post:
 *     summary: Upload an image to a company subfolder
 *     description: Uploads an image to Cloudinary. Use 'companyName' to organize into subfolders.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *                 description: The name of the company (used for subfolder naming)
 *                 example: "AcmeCorp"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *                 publicId:
 *                   type: string
 */
app.post("/upload", upload.single("image"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        log("File uploaded successfully!");
        res.json({
            message: "Upload successful!",
            imageUrl: req.file.path,
            publicId: req.file.filename,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @openapi
 * /contact:
 *   post:
 *     summary: Send a contact form message via email
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Failed to send email
 */
app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ code: 400, error: "Name, email, and message are required." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"InventoryTracker+ Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: `"${name}" <${email}>`,
    subject: subject ? `[Contact Form] ${subject}` : `[Contact Form] Message from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <hr />
      <p>${message.replace(/\n/g, "<br/>")}</p>
      <hr />
      <p style="color:#888;font-size:12px;">Sent via InventoryTracker+ contact form</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    log("(API) Contact form email sent successfully");
    res.json({ code: 200, message: "Email sent successfully." });
  } catch (err) {
    console.error("Error sending contact email:", err);
    res.status(500).json({ code: 500, error: "Failed to send email. Please try again later." });
  }
});


/**
 * @openapi
 * /register:
 *   post:
 *     summary: Register a new user account
 *     responses:
 *       200:
 *         description: Account created successfully
 *       400:
 *         description: Missing or invalid fields
 *       409:
 *         description: Email already registered
 */
app.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, businessName } = req.body;

    if (!firstName || !lastName || !email || !password || !businessName)
        return res.status(400).json({ error: "All fields are required." });
    if (password.length < 8)
        return res.status(400).json({ error: "Password must be at least 8 characters." });

    const dbName = businessName
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "_");
    const passwordHash = await bcrypt.hash(password, 12);
    const result = await dal.createUser({ firstName, lastName, email, passwordHash, businessName, dbName });

    if (result.error) return res.status(409).json({ error: result.error });

    res.json({ code: 200, message: "Account created. Please log in." });
});

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Log in to an existing account
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       400:
 *         description: Missing fields
 *       401:
 *         description: Invalid credentials
 */
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ error: "Email and password are required." });

    const user = await dal.getUserByEmail(email);
    if (!user) return res.status(401).json({ error: "Invalid email or password." });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: "Invalid email or password." });

    req.session.userId      = user._id;
    req.session.userName    = user.firstName;
    req.session.dbName      = user.dbName;
    req.session.businessName = user.businessName;

    res.json({ code: 200, message: "Logged in.", name: user.firstName });
});

/**
 * @openapi
 * /logout:
 *   post:
 *     summary: Log out the current user
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
app.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ error: "Could not log out." });
        res.clearCookie("connect.sid");
        res.redirect("/");
    });
});

module.exports = app;

