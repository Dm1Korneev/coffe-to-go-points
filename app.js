var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("./app_api/models/db");

var uglifyJs = require("uglify-js");
var fs = require("fs");

var routesApi = require("./app_api/routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "jade");

buildJSFile();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "app_client")));

app.use("/api", routesApi);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, "app_client", "index.html"));
});

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
  res.render("error");
});

module.exports = app;

function buildJSFile() {
  var files = {
    "app.js": "app_client/app.js",
    "home.controller.js": "app_client/home/home.controller.js",
    "coffeeToGoData.service.js":
      "app_client/common/services/coffeeToGoData.service.js",
    "geolocation.service.js":
      "app_client/common/services/geolocation.service.js",
    "formatDistance.filter.js":
      "app_client/common/filters/formatDistance.filter.js",
    "ratingStars.directive.js":
      "app_client/common/directives/ratingStars/ratingStars.directive.js",
    "footerGeneric.directive.js":
      "app_client/common/directives/footerGeneric/footerGeneric.directive.js",
    "navigation.directive.js":
      "app_client/common/directives/navigation/navigation.directive.js",
    "pageHeader.directive.js":
      "app_client/common/directives/pageHeader/pageHeader.directive.js",
    "about.controller.js": "app_client/about/about.controller.js",
    "details.controller.js": "app_client/details/details.controller.js",
    "googleMap.directive.js":
      "app_client/common/directives/googleMap/googleMap.directive.js"
  };

  setting = { "app.js": fs.readFileSync("app_client/app.js", "utf8") };
  for (var key in files) {
    setting[key] = fs.readFileSync(files[key], "utf8");
  }

  mkdirSync("public/angular");

  var uglified = uglifyJs.minify(setting, { compress: false });
  fs.writeFile("public/angular/CoffeeToGo.min.js", uglified.code, function(
    error
  ) {
    if (error) {
      console.log(error);
    } else {
      console.log("Script generated and saved: CoffeeToGo.min.js");
    }
  });
}

function mkdirSync(dirPath) {
  try {
    fs.mkdirSync(dirPath);
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
}
