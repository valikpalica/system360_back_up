const express = require('express');
const ActivateDB = require('./DB_API/ActivateDB');
const app = express();
const PORT = process.env.PORT || 8080;





app.listen(PORT,async()=>{
    console.log(`server has been started on port ${PORT}`);
    await ActivateDB();
})


