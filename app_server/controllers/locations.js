var mongoose = require("mongoose");
var request = require("request");

var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === "production") {
  apiOptions.server = "https://coffe-to-go-points.herokuapp.com";
}

function showError(req, res, status) {
  var title, text;
  if (status === 404) {
    title = "404, page not found";
    text = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    text = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    text = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render("generic-text", {
    title: title,
    text: text
  });
}

function renderHomepage(req, res) {
  res.render("location-list", {
    title: "CoffeToGo - find place whith coffe to go",
    pageHeader: {
      title: "Coffe to Go",
      strapline: "Point whith cofee near you!"
    },
    sidebar:
      "Looking for coffe to Go? We helps you to find some one. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem beatae magni ducimus temporibus quis, illo deserunt nisi nesciunt impedit reprehenderit fugiat vel sed repellendus tenetur accusamus voluptate, totam corrupti esse distinctio ab rerum quod doloremque officiis. Ullam dolorum alias animi odio nisi amet distinctio, ipsa eveniet beatae quaerat corporis ex."
  });
}

function renderLocationInfo(req, res, responseBody) {
  res.render("location-info", {
    title: responseBody.name,
    location: responseBody,
    sidebar: {
      first:
        "Starcups is on Coffe To Go because it has accessible wifi and space to sit down with your laptop and get some work done.",
      second:
        "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
    }
  });
}

function renderReviewForm(req, res, responseBody) {
  res.render("location-review-form", {
    title: "Review " + responseBody.name,
    LocationName: responseBody.name,
    error: req.query.err
  });
}

module.exports.homeList = function(req, res, next) {
  renderHomepage(req, res);
};

module.exports.locationInfo = function(req, res, next) {
  var requestOptions = {
    url: apiOptions.server + "/api/locations/" + req.params.locationId,
    method: "GET",
    json: {}
  };

  request(requestOptions, function(err, response, body) {
    if (response.statusCode === 200) {
      renderLocationInfo(req, res, body);
    } else {
      showError(req, res, response.statusCode);
    }
  });
};

module.exports.addReview = function(req, res, next) {
  var requestOptions = {
    url: apiOptions.server + "/api/locations/" + req.params.locationId,
    method: "GET",
    json: {}
  };

  request(requestOptions, function(err, response, body) {
    if (response.statusCode === 200) {
      renderReviewForm(req, res, body);
    } else {
      showError(req, res, response.statusCode);
    }
  });
};

module.exports.doAddReview = function(req, res, next) {
  // validation
  if (!req.body.author || !req.body.rating || !req.body.reviewtext) {
    res.redirect(
      "/location/" + req.params.locationId + "/review/new" + "?err=val"
    );
    return;
  }

  var requestOptions = {
    url:
      apiOptions.server +
      "/api/locations/" +
      req.params.locationId +
      "/reviews",
    method: "POST",
    json: req.body
  };

  request(requestOptions, function(err, response, body) {
    if (response.statusCode === 201) {
      res.redirect("/location/" + req.params.locationId);
    } else if (
      response.statusCode === 400 &&
      body.name &&
      body.name === "ValidationError"
    ) {
      res.redirect(
        "/location/" + req.params.locationId + "/review/new" + "?err=val"
      );
    } else {
      showError(req, res, response.statusCode);
    }
  });
};
