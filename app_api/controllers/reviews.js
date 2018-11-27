var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsResponse = function(res, status, content){
    res.status(status);
    res.json(content);
}

module.exports.reviewsCreate = function (req, res, next) {
    sendJsResponse(res, 200, {"status" : "success"})
}

module.exports.reviewsReadOne = function (req, res, next) {
    if (req.params && req.params.locationId && req.params.reviewId) {
        Loc
        .findById(req.params.locationId)
        .select('name reviews')
        .exec(function(err, location){
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
                        }
                        sendJsResponse(res, 200, response)        
                    } else {
                        sendJsResponse(res, 404, {message: "ReviewId not found"})
                    }  
                } else {
                    sendJsResponse(res, 404, {message: "No reviews found"})   
                }
            } else if (!location) {
                sendJsResponse(res, 404, {message: "locationId not found"})
            } else if (err) {
                sendJsResponse(res, 404, err)   
            }    
        })
    } else {
        sendJsResponse(res, 404, {message: "No locationId in request"})    
    }
}

module.exports.reviewsUpdateOne = function (req, res, next) {
    sendJsResponse(res, 200, {"status" : "success"})
}

module.exports.reviewsDeleteOne = function (req, res, next) {
    sendJsResponse(res, 200, {"status" : "success"})
}