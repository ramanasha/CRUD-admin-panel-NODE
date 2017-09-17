const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User');


module.exports = function() {
    passport.use(new LocalStrategy(

        function(username, password, done) {
            User.findOne({
                username: username
            }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Ese email no existe en nuestra base de datos' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'La contraseña es incorrecta, intentalo de nuevo' });
                }
                return done(null, user);

            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}