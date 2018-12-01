var mongoose = require("mongoose");

module.exports.homeList = function(req, res, next) {
  res.render("location-list", {
    title: "CoffeToGo - find place whith coffe to go",
    pageHeader: {
      title: "Coffe to Go",
      strapline: "Point whith cofee near you!"
    },
    locations: [
      {
        name: "Location 1",
        address: "121 ight Street, Reading, RG6 1PS",
        rating: 3,
        facilities: ["Hot drinks", "Food", "Wi Fi"],
        distance: "100m"
      },
      {
        name: "Location 2",
        address: "122 ight Street, Reading, RG6 1PS",
        rating: 4,
        facilities: ["Hot drinks", "Wi Fi"],
        distance: "200m"
      },
      {
        name: "Location 3",
        address: "123 ight Street, Reading, RG6 1PS",
        rating: 5,
        facilities: ["Food", "Wi Fi"],
        distance: "300m"
      }
    ],
    sidebar:
      "Looking for coffe to Go? We helps you to find some one. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem beatae magni ducimus temporibus quis, illo deserunt nisi nesciunt impedit reprehenderit fugiat vel sed repellendus tenetur accusamus voluptate, totam corrupti esse distinctio ab rerum quod doloremque officiis. Ullam dolorum alias animi odio nisi amet distinctio, ipsa eveniet beatae quaerat corporis ex."
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
