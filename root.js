const express = require("express");
const app = express();
require("dotenv").config({ path: ".env" });

const frontendApp = require("./frontend/app");
const backendApp = require("./backend/app");

app.use("/api", backendApp);
app.use("", frontendApp);

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
    console.log(`InventoryTrackerPlus running on port ${PORT}`);
    console.log(`API & Docs: http://localhost:${PORT}/api/docs`);
    console.log(`Frontend: http://localhost:${PORT}/`);
});
