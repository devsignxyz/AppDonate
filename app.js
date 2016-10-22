/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require("express");
var path = require("path");

var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var authenticate = require("./authenticate");
var LocalStrategy = require("passport-local").Strategy;
var config = require("./config");

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    // we're connected!
    console.log("Connected correctly to server");
});

var routes = require("./routes/index");
var users = require("./routes/users");
var donorRouter = require("./routes/donorRouter");
var teamRouter = require("./routes/teamRouter");
var infoRouter = require("./routes/infoRouter");
var needRouter = require("./routes/needRouter");


// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require("cfenv");

// create a new express server
var app = express();




// serve the files out of ./public as our main files
app.use(express.static(__dirname + "/public"));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


//var host = (process.env.VCAP_APP_HOST || 'localhost');
//var port = (process.env.VCAP_APP_PORT || 3001); para trabajar local
  

// start server on the specified port and binding host
app.listen(appEnv.port, "0.0.0.0", function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
})



// Secure traffic only
app.all("*", function(req, res, next){
    console.log("req start: ",req.secure, req.hostname, req.url, app.get("port"));
  if (req.secure) {
    return next();
  }

 res.redirect("https://"+req.hostname+":"+app.get("secPort")+req.url);
})
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// passport config

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);
app.use("/users", users);
app.use("/donor", donorRouter);
app.use("/team",teamRouter);
app.use("/info",infoRouter);
app.use("/servs",needRouter);
app.use("/need",needRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;