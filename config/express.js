const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcrypt')


const verifyHandler = function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        User.findOne({uid: profile.id}).exec(function (err, user) {
            if (user) {
                return done(null, user)
            } else {
                User.create({
                    first_name: profile._json.first_name,
                    last_name: profile._json.last_name,
                    uid: profile._json.id,
                    contact: profile._json.email,
                    profilePic: profile._json.picture.data.url,
                    birthday: profile._json.birthday,
                    facebookLink: profile._json.link,
                    coverPic: profile._json.cover.source,
                    about: profile._json.about
                }).exec(function (err, user) {
                    return done(err, user)
                })
            }
        })
    })
}

passport.serializeUser(function (user, done) {
    done(null, user.uid)
})

passport.deserializeUser(function (uid, done) {
    User.findOne({uid: uid}).exec(function (err, user) {
        done(err, user)
    })
})



module.exports = {

    // Init custom express middleware
    express: {
        customMiddleware: function (app) {
            console.log('Express Middleware -- Start Facebook Passport Strategy')
            passport.use(new FacebookStrategy({
                    clientID: "1850803855237452",
                    clientSecret: "e6b927a11b694360da74ae08c389a3ee",
                    callbackURL: "http://localhost:1337/auth/facebook/callback",
                    profileFields: ['id',
                        'displayName',
                        'photos',
                        'email',
                        'about',
                        'first_name',
                        'last_name',
                        'cover',
                        'link',
                        'birthday'
                    ]

                },
                verifyHandler
            ))

            app.use(passport.initialize())
            app.use(passport.session())
        }
    }

}