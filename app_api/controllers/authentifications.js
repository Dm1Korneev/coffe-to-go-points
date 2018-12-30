var mongoose = require("mongoose");
var UserModel = mongoose.model("User");
var passport = require("passport");

function sendJsResponse(res, status, content) {
  res.status(status);
  res.json(content);
}

module.exports.register = function(req, res) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    sendJsResponse(res, 400, { message: "all fields required" });
    return;
  }

  user = new UserModel();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);
  user.save(function(err) {
    if (err) {
      sendJsResponse(res, 404, err);
    } else {
      token = user.generateJwt();
      sendJsResponse(res, 200, { token: token });
    }
  });
};

module.exports.login = function(req, res) {
  if (!req.body.email || !req.body.password) {
    sendJsResponse(res, 400, { message: "all fields required" });
    return;
  }

  passport.authenticate("local", function(err, user, info) {
    if (err) {
      sendJsResponse(res, 404, err);
      return;
    }
    if (user) {
      token = user.generateJwt();
      sendJsResponse(res, 200, { token: token });
    } else {
      sendJsResponse(res, 401, info);
    }
  })(req, res);
};
