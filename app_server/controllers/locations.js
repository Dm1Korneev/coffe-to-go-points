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
  res.render("location-info", {
    title: "Location Info",
    location: {
      name: "Location 1",
      address: "121 ight Street, Reading, RG6 1PS",
      rating: 3,
      facilities: ["Hot drinks", "Food", "Wi Fi"],
      distance: "100m",
      openingHours: [
        "Monday - Friday : 7:00am - 7:00pm",
        "Saturday : 8:00am - 5:00pm",
        "Sunday : closed"
      ],
      reviews: [
        {
          author: "Simon Holmes",
          reviewTimestamp: "16 July 2013",
          rating: 5,
          text: "What a great place. I can't say enough good things about it."
        },
        {
          author: "Charlie Chaplin",
          reviewTimestamp: "16 June 2013",
          rating: 4,
          text: "It was okay. Coffee wasn't great, but the wifi was fast."
        },
        {
          author: "Simon Holmes",
          reviewTimestamp: "19 July 2013",
          rating: 3,
          text: "What a great place. I can't say enough good things about it."
        }
      ],
      coords: [55.725, 37.573]
    },
    sidebar: {
      first:
        "Starcups is on Coffe To Go because it has accessible wifi and space to sit down with your laptop and get some work done.",
      second:
        "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
    }
  });
};

module.exports.addReview = function(req, res, next) {
  res.render("location-review-form", {
    title: "Add Review",
    LocationName: "Location 1"
  });
};
