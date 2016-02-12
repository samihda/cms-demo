var db = require('../db/users');

exports.findById = function(id, cb) {
    process.nextTick(function() {
        db.User.findOne({_id: id}, {password: 0}, function (err, user) {
            if (err) {
              cb(new Error('The user does not exist'));
            }
            cb(null, user);
        });
    });
};

exports.findByUsername = function(name, cb) {
    process.nextTick(function() {
        db.User.findOne({username: name}, function (err, user) {
            if (err) {
                return cb(null, null);
            }
            return cb(null, user);
        });
    });
};
