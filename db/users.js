var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dbName = 'cms-test';


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

var UserSchema = new Schema({
    username: String,
    password: String,
    email: String
});

var Article = mongoose.model('Article', ArticleSchema);
var User = mongoose.model('User', UserSchema);

exports.User = User;
exports.Article = Article;


// API
exports.getArticles = function (req, res) {
    Article.find().sort({date: -1}).exec(function (err, data) {
        if (err) {
            return console.error(err);
        }
        res.json(data);
    });
};

exports.getArticle = function (req, res) {
    Article.findOne({_id: req.params.id}, function (err, data) {
        if (err) {
            return console.error(err);
        }
        res.json(data);
    });
};

// may only be called by once authenticated
// requires user info in 'req.body'
exports.getUserArticles = function (req, res) {
    Article.find({author_id: req.user._id}).sort({date: -1}).exec(function (err, data) {
        if (err) {
            return console.error(err);
        }
        res.json(data);
    });
};

exports.postArticle = function (req, res) {
    var article = new Article({
		title: req.body.title,
		body: req.body.body,
		author_id: req.user._id
	});
    
	article.save(function (err) {
		if (err) {
			return console.error(err);
		}
        res.json({ message: article.title + ' saved.' });
	});
};

exports.updateArticle = function (req, res) {
    Article.findOneAndUpdate(
        {_id: req.params.id},
        {title: req.body.title, body: req.body.body},
        {new: true}, // return the updated object instead of the old one
        
        function (err, updatedPost) {
            if (err) {
                return console.error(err);
            }
            res.json({ message: updatedPost.title + ' updated.' });
        });
};

exports.deleteArticle = function (req, res) {
    Article.findOneAndRemove(
        {_id: req.params.id},
        
        function (err, deletedPost) {
            if (err) {
                return console.error(err);
            }
            res.json({ message: deletedPost.title + ' deleted.' });
        });
};


// auth
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
            if (err) {
                return cb(null, null);
            }
            return cb(null, user);
        });
    });
};
