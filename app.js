const express = require('express');
const ActivateDB = require('./DB_API/ActivateDB');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;
let bodyParser = require('body-parser')
const auth = require('./route/autorization');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initilizePassport = require('./Passport/index');
initilizePassport(passport);
app.set("views engine", "hbs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24*60*60*1000
    }
}));

app.use(express.static(path.join(__dirname,'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser('system360'));
app.use('/auth',auth);

app.listen(PORT,async()=>{
    console.log(`server has been started on port ${PORT}`);
    await ActivateDB();
})


