var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/cms-test', function (err) {
  if (err) {
    console.log('database connection error ' + err);
  }
  else {
    console.log('connected to mongodb');
  }
});

var ArticleSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: Date,
    default: Date.now
  }
});
var Article = mongoose.model('Article', ArticleSchema);

var UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  articles: [ArticleSchema]
});
var User = mongoose.model('User', UserSchema);

exports.User = User;
exports.Article = Article;


exports.findById = function(id, cb) {
  process.nextTick(function() {
    User.findOne({_id: id}, {password: 0}, function (err, user) {
      if (err) {
        //console.log(err);
        cb(new Error('The user does not exist'));
      }
      else {
        cb(null, user);
      }
    });
  });
};

exports.findByUsername = function(name, cb) {
  process.nextTick(function() {
    User.findOne({username: name}, function (err, user) {
      console.log(name);
      if (err) {
        return cb(null, null);
      }
      else {
        return cb(null, user);
      }
    });
  });
};
