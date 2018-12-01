var mongoose = require("mongoose");
var request = require("request");

var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === "production") {
  apiOptions.server = "https://coffe-to-go-points.herokuapp.com/";
}

function formatDistance(distance) {
  if (distance > 1000) {
    distance = "" + (distance / 1000).toFixed(1) + " km";
  } else {
    distance = "" + distance.toFixed(0) + " m";
  }
  return distance;
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

function renderHomepage(req, res, responseBody) {
  var message;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else if (!responseBody.length) {
    message = "No places fount nearby";
  }

  res.render("location-list", {
    title: "CoffeToGo - find place whith coffe to go",
    pageHeader: {
      title: "Coffe to Go",
      strapline: "Point whith cofee near you!"
    },
    locations: responseBody,
    sidebar:
      "Looking for coffe to Go? We helps you to find some one. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem beatae magni ducimus temporibus quis, illo deserunt nisi nesciunt impedit reprehenderit fugiat vel sed repellendus tenetur accusamus voluptate, totam corrupti esse distinctio ab rerum quod doloremque officiis. Ullam dolorum alias animi odio nisi amet distinctio, ipsa eveniet beatae quaerat corporis ex.",
    message: message
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

module.exports.homeList = function(req, res, next) {
  var requestOptions = {
    url: apiOptions.server + "/api/locations",
    method: "GET",
    json: {},
    qs: {
      lng: 55.725,
      lat: 37.573,
      maxDistance: 2000
    }
  };

  request(requestOptions, function(err, response, body) {
    if (response.statusCode === 200 && body.length) {
      body.forEach(element => {
        element.distance = formatDistance(element.distance);
      });
    }
    renderHomepage(req, res, body);
  });
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
  res.render("location-review-form", {
    title: "Add Review",
    LocationName: "Location 1"
  });
};
