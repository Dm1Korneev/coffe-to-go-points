var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.locationsListByDistance = function (req, res, next) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    if (!lng || !lat) {
        sendJsResponse(res, 404, { message: "lng and lat query parameters are required" });
        return;
    }
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };
    var geoOptions = {
        near: point,
        spherical: true,
        distanceField: "distance",
        num: 10,
        maxDistance: 2000
    };

    Loc.aggregate([{
        $geoNear: geoOptions
    }], function (err, result) {
        if (err) {
            sendJsResponse(res, 404, err);
            return;
        }

        var locations = [];
        result.forEach(function (doc) {
            locations.push({
                distance: doc.distance,
                name: doc.name,
                address: doc.address,
                rating: doc.rating,
                facilities: doc.facilities,
                _id: doc._id
            });
        })
        sendJsResponse(res, 200, locations);
    })
}

module.exports.locationsCreate = function (req, res, next) {
    var facilities, openingTimes;

    if (req.body.facilities) {
        facilities = req.body.facilities.split(",");
    }
    if (req.body.days1) {
        openingTimes = [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1,
        }];
    }

    Loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities: facilities,
        coords: [parseFloat(req.body.lng),
                parseFloat(req.body.lat)],
        openingTimes: openingTimes
    }, function (err, location) {
        if (err) {
            sendJsResponse(res, 400, err);
        } else {
            sendJsResponse(res, 201, location);
        }
    });
}

module.exports.locationsReadOne = function (req, res, next) {
    if (req.params && req.params.locationId) {
        Loc.
            findById(req.params.locationId).
            exec(function (err, location) {
                if (location) {
                    sendJsResponse(res, 200, location)
                } else if (!location) {
                    sendJsResponse(res, 404, { message: "locationId not found" })
                } else if (err) {
                    sendJsResponse(res, 404, err)
                }
            })
    } else {
        sendJsResponse(res, 404, { message: "No locationId in request" })
    }
}

module.exports.locationsUpdateOne = function (req, res, next) {
    sendJsResponse(res, 200, { "status": "success" })
}

module.exports.locationsDeleteOne = function (req, res, next) {
    sendJsResponse(res, 200, { "status": "success" })
}