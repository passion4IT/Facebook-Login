/**
 * AuthController
 **/

const passport = require('passport')

var AuthController = {
    logout: function(req, res) {
        req.session.user = null
        res.redirect('/')
    },

    dashboard: function(req, res) {
        if(req.isAuthenticated()) {
            return res.view('user/dashboard', {
                user: req.user
            })
        }
        else {
            res.redirect('/')
        }
    },

    'facebook': function (req, res, next) {
        passport.authenticate('facebook', { scope: ['email']},
            function (err, user) {
                req.logIn(user, function (err) {
                    if(err) {
                        console.log(err)
                        res.view('500')
                        return
                    }
                    res.redirect('/profile')
                    return
                })
            })(req, res, next)
    },
    'facebook/callback': function (req, res, next) {
        passport.authenticate('facebook',
            function (req, res) {
                res.redirect('/profile')
            })(req, res, next)
    }

}

module.exports = AuthController