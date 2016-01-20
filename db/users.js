var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*mongoose.connect('mongodb://localhost/cms-test', function (err) {
  if (err) {
    console.log('database connection error ' + err);
  }
  console.log('connected to mongodb');
});*/
mongoose.connect('mongodb://localhost/cms-test');
mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', console.log.bind(console, 'connected to mongodb'));

var ArticleSchema = new Schema({
  title: String,
  body: String,
  author_id: String,
  date: {
    type: Date,
    default: Date.now
  }
});
var Article = mongoose.model('Article', ArticleSchema);

var UserSchema = new Schema({
  username: String,
  password: String,
  email: String
});
var User = mongoose.model('User', UserSchema);

exports.User = User;
exports.Article = Article;


exports.findById = function(id, cb) {
  process.nextTick(function() {
    User.findOne({_id: id}, {password: 0}, function (err, user) {
      if (err) {
        cb(new Error('The user does not exist'));
      }
      cb(null, user);
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
      return cb(null, user);
    });
  });
};
