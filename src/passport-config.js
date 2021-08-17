const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/adminUser");
const bcrypt = require("bcrypt");
module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField:"email"},
        function(email, password, done) {
            User.findOne({ email: email}, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect Email.' });
            }
            bcrypt.compare(password, user.password, function(err, result) {
                if(err) return done(err);
                if(result){
                    return done(null,user);
                }else{
                    return done(null,false,{message:"Password incorrect"});
                }
            });
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
