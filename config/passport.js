const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs'),
    User = require('../models').User;

module.exports = function(passport) {
    passport.use(
        new LocalStrategy(function(username, password, done) {
            User.find({ where: { username: username } })
                .then(user => {
                    if (!user) {
                        console.log('No such user');
                        return done(null, false, { message: 'Incorrect Credentials' });
                    }
                    bcrypt.compare(password, user.password).then(res => {
                        if (res) {
                            console.log('Username Correct');
                            console.log(user);
                            return done(null, user);
                        } else {
                            console.log('Username Incorrect');
                            return done(null, false, { message: 'Incorrect Credentials' });
                        }
                    });
                })
                .catch();
        })
    );

    //Serialize Sessions 
    passport.serializeUser(function(user, done) {
        console.log(user.dataValues.id);
        done(null, user.dataValues.id);
    });

    //DeSerialize Sessions
    passport.deserializeUser(function(id, done) {
        User.findById(id)
            .then(user => {
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            })
            .catch(err => done(err, false));
    });
};