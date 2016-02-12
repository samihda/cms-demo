var db = require('../db/users');

exports.getArticles = function (req, res) {
    db.Article.find().sort({date: -1}).exec(function (err, data) {
        if (err) {
            return console.error(err);
        }
        res.json(data);
    });
};

exports.getArticle = function (req, res) {
    db.Article.findOne({_id: req.params.id}, function (err, data) {
        if (err) {
            return console.error(err);
        }
        res.json(data);
    });
};

// may only be called by once authenticated
// requires user info in 'req.body'
exports.getUserArticles = function (req, res) {
    db.Article.find({author_id: req.user._id}).sort({date: -1}).exec(function (err, data) {
        if (err) {
            return console.error(err);
        }
        res.json(data);
    });
};

exports.postArticle = function (req, res) {
    var article = new db.Article({
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
    db.Article.findOneAndUpdate(
        {_id: req.params.id},
        {title: req.body.title, body: req.body.body},
        {new: true},
        
        function (err, updatedPost) {
            if (err) {
                return console.error(err);
            }
            res.json({ message: updatedPost.title + ' updated.' });
        });
};

exports.deleteArticle = function (req, res) {
    db.Article.findOneAndDelete(
        {_id: req.params.id},
        
        function (err, deletedPost) {
            if (err) {
                return console.error(err);
            }
            res.json({ message: deletedPost.title + ' deleted.' });
        });
};
