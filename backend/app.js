const express = require("express");
const app = express();
const path = require('path');

const { upload } = require('./utils/cloudinary');
const {dal} = require('./mongoDAL');
const debugLogger = require('../logger');


const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Inventory Tracker Plus API',
            version: '1.0.0',
            summary: 'API layer for Inventory Tracker Plus'
        },
    },
    servers: [
        {
            url: '/api',
            description: 'API layer for Inventory Tracker Plus'
        }
    ],
    apis: [path.join(__dirname, 'app.js')],
};

const specs = swaggerJsdoc(options);

const log = debugLogger("Backend");

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api', (req, res) => {
    res.redirect('/docs');
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
app.get('/stock', async (req, res) => {
    log("(API) GETTING ALL STOCK");
    const filter = {};
    if (req.query.name) {
        filter.name = req.query.name;
    }
    if (req.query.category) {
        filter.category = req.query.category;
    }
    // TODO: implement the filter in the DAL, validate filter in API before passing to DAL
    try{
        const dalResponse = await dal.getAllStock();
        let response = {
        code: 200,
        body: dalResponse
        };
        res.json(response);
    }catch(e){
        console.error(e);
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
app.get('/stock/:id', (req, res) => {
    // TODO: get a single stock doc by id
    res.json(data)
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
app.get('/usage/:id', (req, res) => {
    // TODO: get the usage doc by its ID
    res.json(data)
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
app.get('/categories', (req, res) => {
    // TODO: get all categories

    res.json(data)
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
app.delete('/deleteUsage/:id', (req, res) => {
    // TODO: delete the usage doc by its ID
    res.json(data)
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
app.delete('/deleteStock/:id', (req, res) => {
    // TODO: delete the stock doc by its ID
    res.json(data)
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
app.delete('/deleteCategory/:id', (req, res) => {
    // TODO: delete the category doc by its ID
    res.json(data)
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
app.post('/createStock', (req, res) => {
    // TODO: create a new stock doc
    res.json(data)
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
app.post('/createUsage', (req, res) => {
    // TODO: create a new usage doc
    res.json(data)
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
app.post('/createCategory', (req, res) => {
    // TODO: create a new category doc
    res.json(data)
});

/** 
 * @openapi
 * /updateStock/:id:
 *   post:
 *     summary: Update a stock doc by ID
 *     responses:
 *       200:
 *         description: A single stock doc
*/
app.post('/updateStock/:id', (req, res) => {
    // TODO: update the stock doc by its ID
    res.json(data)
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
app.post('/updateUsage/:id', (req, res) => {
    // TODO: update the usage doc by its ID
    res.json(data)
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
app.post('/updateCategory/:id', (req, res) => {
    // TODO: update the category doc by its ID
    res.json(data)
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
app.post('/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        res.json({
            message: "Upload successful!",
            imageUrl: req.file.path,
            publicId: req.file.filename
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;