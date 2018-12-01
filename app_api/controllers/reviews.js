var mongoose = require("mongoose");
var LocationModel = mongoose.model("Location");

function sendJsResponse(res, status, content) {
  res.status(status);
  res.json(content);
}

function updateAverageRating(locationId) {
  LocationModel.aggregate(
    [
      {
        $match: { _id: locationId }
      },
      {
        $project: { rating: "$rating", AvgRating: { $avg: "$reviews.rating" } }
      }
    ],
    function(err, result) {
      if (!err) {
        if (result.length > 0 && result[0].AvgRating) {
          var AvgRating = Math.round(result[0].AvgRating);
          if (AvgRating != result[0].rating) {
            doSetAverageRating(locationId, AvgRating);
          }
        } else {
          console.log(locationId, result);
        }
      } else {
        console.log(err);
      }
    }
  );
}

function doSetAverageRating(locationId, AvgRating) {
  LocationModel.updateOne(
    { _id: locationId },
    {
      $set: { rating: AvgRating }
    },
    function(err) {
      if (!err) {
        console.log(
          "Average rating updated to " +
            AvgRating +
            " in location " +
            locationId
        );
      } else {
        console.log(err);
      }
    }
  );
}

function doAddReview(req, res, location) {
  if (location) {
    location.reviews.push({
      author: req.body.author,
      rating: parseInt(req.body.rating),
      reviewtext: req.body.reviewtext
    });
    location.save(function(err, location) {
      if (!err) {
        updateAverageRating(location._id);
        var thisReview = location.reviews[location.reviews.length - 1];
        sendJsResponse(res, 201, thisReview);
      } else {
        sendJsResponse(res, 400, err);
      }
    });
  } else {
    sendJsResponse(res, 404, { message: "locationId not found" });
  }
}

module.exports.reviewsCreate = function(req, res, next) {
  if (req.params.locationId) {
    LocationModel.findById(req.params.locationId)
      .select("reviews")
      .exec(function(err, location) {
        if (!err) {
          doAddReview(req, res, location);
        } else {
          sendJsResponse(res, 400, err);
        }
      });
  } else {
    sendJsResponse(res, 400, { message: "No locationId in request" });
  }
};

module.exports.reviewsReadOne = function(req, res, next) {
  if (req.params && req.params.locationId && req.params.reviewId) {
    LocationModel.findById(req.params.locationId)
      .select("name reviews")
      .exec(function(err, location) {
        if (location) {
          var response, review;

          if (location.reviews && location.reviews.length > 0) {
            review = location.reviews.id(req.params.reviewId);
            if (review) {
              response = {
                location: {
                  name: location.name,
                  id: req.params.locationId
                },
                review: review
              };
              sendJsResponse(res, 200, response);
            } else {
              sendJsResponse(res, 404, { message: "ReviewId not found" });
            }
          } else {
            sendJsResponse(res, 404, { message: "No reviews found" });
          }
        } else if (!location) {
          sendJsResponse(res, 404, { message: "locationId not found" });
        } else if (err) {
          sendJsResponse(res, 404, err);
        }
      });
  } else {
    sendJsResponse(res, 404, { message: "No locationId in request" });
  }
};

module.exports.reviewsUpdateOne = function(req, res, next) {
  if (!req.params.locationId || !req.params.reviewId) {
    sendJsResponse(res, 400, {
      message: "No locationId or reviewId in request"
    });
    return;
  }

  LocationModel.findById(req.params.locationId)
    .select("reviews")
    .exec(function(err, location) {
      if (err) {
        sendJsResponse(res, 400, err);
        return;
      } else if (!location) {
        sendJsResponse(res, 404, { message: "locationId not found" });
        return;
      } else if (!location.reviews || location.reviews.length == 0) {
        sendJsResponse(res, 404, { message: "no review to update" });
        return;
      }

      var thisReview = location.reviews.id(req.params.reviewId);
      if (!thisReview) {
        sendJsResponse(res, 404, { message: "reviewid not found" });
      }

      thisReview.author = req.body.author;
      thisReview.rating = parseInt(req.body.rating);
      thisReview.reviewtext = req.body.reviewtext;

      location.save(function(err, location) {
        if (!err) {
          updateAverageRating(location._id);
          sendJsResponse(res, 201, thisReview);
        } else {
          sendJsResponse(res, 400, err);
        }
      });
    });
};

module.exports.reviewsDeleteOne = function(req, res, next) {
  sendJsResponse(res, 200, { status: "success" });
};
