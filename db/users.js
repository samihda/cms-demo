var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dbName = 'buecheler3';
//var dbName = 'cms-test';


// database connection
mongoose.connect('mongodb://localhost/' + dbName);
mongoose.connection.on('error', console.error.bind(console, 'Error connecting to database: '));
mongoose.connection.once('open', console.log.bind(console, 'Connected to database'));

// database schemas
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

// api
exports.getArticles = function (req, res) {
    Article.find().sort({date: -1}).exec(function (err, data) {
        res.json(data);
    });
};

exports.getArticle = function (req, res) {
    Article.findOne({_id: req.params.id}, function (err, data) {
        res.json(data);
    });
};

// express app routing
// use client-side JS (AJAX) for delete and put methods
/*app.delete('/articles/:id', function (req, res) {
    db.users.Article.findOneAndDelete({_id: req.params.id}, function (err, deletedPost) {
        if (err) {
            return console.error(err);
        }
        console.log(deletedPost.title + ' deleted');
        res.redirect('/profile');
    });
});

app.put('/articles/:id', function (req, res) {
    db.users.Article.findOneAndUpdate({_id: req.params.id}, {title: req.body.title, body: req.body.body}, function (err, deletedPost) {
        if (err) {
            return console.error(err);
        }
        console.log(deletedPost.title + ' deleted');
        res.redirect('/profile');
    });
});*/





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
