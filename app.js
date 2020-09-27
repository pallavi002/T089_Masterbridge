require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const initDatabase = require("./config/database");
const initRoutes = require("./routes/index");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

// Session
app.use(
    session({
        secret: "session",
        resave: true,
        saveUninitialized: true,
    })
);

// Initializing Database
initDatabase();

// Initializing Routes
initRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("index");
});

app.get("/", function() {
    res.send("W E L C O M E")
})

app.listen("5000", function() {
    console.log("Server running")
})

module.exports = app;