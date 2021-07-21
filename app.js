const express = require('express');
const ActivateDB = require('./DB_API/ActivateDB');
const app = express();
const PORT = process.env.PORT || 8080;
let bodyParser = require('body-parser')
const auth = require('./route/autorization');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/auth',auth);

app.listen(PORT,async()=>{
    console.log(`server has been started on port ${PORT}`);
    await ActivateDB();
})


