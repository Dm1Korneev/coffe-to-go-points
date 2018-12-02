var express = require("express");
var router = express.Router();
var ctrlLocations = require("../controllers/locations");
var ctrlOthers = require("../controllers/others");

router.get("/", ctrlLocations.homeList);
router.get("/location/:locationId", ctrlLocations.locationInfo);
router.get("/location/:locationId/review/new", ctrlLocations.addReview);
router.post("/location/:locationId/review/new", ctrlLocations.doAddReview);

router.get("/about", ctrlOthers.about);

module.exports = router;
