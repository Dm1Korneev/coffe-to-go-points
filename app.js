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

var uglified = uglifyJs.minify(
  {
    "app.js": fs.readFileSync("app_client/app.js", "utf8"),
    "home.controller.js": fs.readFileSync(
      "app_client/home/home.controller.js",
      "utf8"
    ),
    "coffeToGoData.service.js": fs.readFileSync(
      "app_client/common/services/coffeToGoData.service.js",
      "utf8"
    ),
    "geolocation.service.js": fs.readFileSync(
      "app_client/common/services/geolocation.service.js",
      "utf8"
    ),
    "formatDistance.filter.js": fs.readFileSync(
      "app_client/common/filters/formatDistance.filter.js",
      "utf8"
    ),
    "ratingStars.directive.js": fs.readFileSync(
      "app_client/common/directives/ratingStars/ratingStars.directive.js",
      "utf8"
    ),
    "footerGeneric.directive.js": fs.readFileSync(
      "app_client/common/directives/footerGeneric/footerGeneric.directive.js",
      "utf8"
    ),
    "navigation.directive.js": fs.readFileSync(
      "app_client/common/directives/navigation/navigation.directive.js",
      "utf8"
    ),
    "pageHeader.directive.js": fs.readFileSync(
      "app_client/common/directives/pageHeader/pageHeader.directive.js",
      "utf8"
    ),
    "about.controller.js": fs.readFileSync(
      "app_client/about/about.controller.js",
      "utf8"
    ),
    "details.controller.js": fs.readFileSync(
      "app_client/details/details.controller.js",
      "utf8"
    )
  },
  { compress: false }
);
fs.writeFile("public/angular/CoffeToGo.min.js", uglified.code, function(error) {
  if (error) {
    comsole.log(error);
  } else {
    console.log("Script generated and saved: CoffeToGo.min.js");
  }
});

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
