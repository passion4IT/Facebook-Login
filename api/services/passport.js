
var passport = require('passport')

passport.serializeUser(function (user, next) {
    next(null, user.id);
});