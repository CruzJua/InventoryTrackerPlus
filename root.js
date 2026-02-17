const express = require('express');
const app = express();

const frontendApp = require('./frontend/app'); 
const backendApp = require('./backend/app');


app.use('/api', backendApp);
app.use('', frontendApp);

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
    console.log(`InventoryTrackerPlus running on port ${PORT}`);
    console.log(`API & Docs: http://localhost:${PORT}/api`);
    console.log(`Frontend: http://localhost:${PORT}/`);
});