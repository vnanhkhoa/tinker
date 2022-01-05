const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');

const loginRouter = require('./routers/login.router')
const adminRouter = require('./routers/home.router')

const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(cookieParser("mySecretKey"))

app.use(morgan("dev"))
app.use("/assets", express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(cors());

app.use(session({
	secret: 'mySecretKey',
}));

app.use("/login" ,loginRouter);
app.use("/", check ,adminRouter);

function check (req, res, next) {
    if (!req.signedCookies.user) {
        res.redirect('/login');
        return;
    }
    res.locals.user = req.signedCookies.user;
    next();
}



app.listen(port, () => console.log(`App listening at http://localhost:${port}`));