var mongoose = require('mongoose');

var Loc = mongoose.model('Location');

var sendJsResponse = function(res, status, content){
    res.status(status);
    res.json(content);
}

module.exports.locationsListByDistance = function (req, res, next) {
    sendJsResponse(res, 200, {"status" : "success"})
}

module.exports.locationsCreate = function (req, res, next) {
    sendJsResponse(res, 200, {"status" : "success"})
}

module.exports.locationsReadOne = function (req, res, next) {
    Loc.
        findById(req.params.locationId).
        exec(function(err, location){
            sendJsResponse(res, 200, location)    
        })
}

module.exports.locationsUpdateOne = function (req, res, next) {
    sendJsResponse(res, 200, {"status" : "success"})
}

module.exports.locationsDeleteOne = function (req, res, next) {
    sendJsResponse(res, 200, {"status" : "success"})
}