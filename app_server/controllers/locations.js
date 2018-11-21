module.exports.homeList = function (req, res, next) {
    res.render('location-list', { title: 'Home' });
}

module.exports.locationInfo = function (req, res, next) {
    res.render('location-info', { title: 'Location Info' });
}

module.exports.addReview = function (req, res, next) {
    res.render('location-review-form', { title: 'Add Review' });
}