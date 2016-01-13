var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');


// passport
passport.use(new Strategy(function (username, password ,callback) {
	db.users.findByUsername(username, function(err, user) {
		if (err) { return callback(err); }
		if (!user) { return callback(null, false); }
		if (user.password != password) { return callback(null, false); }
		return callback(null, user);
	});
}));

passport.serializeUser(function (user, callback) {
	callback(null, user._id);
});

passport.deserializeUser(function (id, callback) {
	db.users.findById(id, function (err, user) {
		if (err) { return callback(err); }
		callback(null, user);
	});
});


// express app
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());


// routes
app.get('/', function (req, res) {
	res.render('home', { user: req.user });
});

app.get('/signup', function (req, res) {
	res.render('signup');
});

app.post('/signup', function (req, res) {
	var user = new db.users.User({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email
	});
	user.save(function (err) {
		if (err) {
			return console.error(err);
		}
		console.log(user.username + ' inserted');
	});
	res.redirect('/login');
});

app.get('/login', function (req, res) {
	res.render('login');
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
	res.redirect('/');
});

app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

app.get('/articles', function (req, res) {
	db.users.Article.find().sort({date: -1}).exec(function (err, list) {
		if (err) {
			return console.error(err);
		}
		res.render('articles', {articles: list});
	});
});

app.get('/articles/:id', function (req, res) {
	db.users.Article.findOne({_id: req.params.id}, function (err, post) {
		if (err) {
			return console.error(err);
		}
		res.render('article', {article: post});
	});
});

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

/*app.get('/edit', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
	res.render('edit', {article: article});
});*/

app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
	db.users.Article.find({author_id: req.user._id}).sort({date: -1}).exec(function (err, list) {
		if (err) {
			return console.error(err);
		}
		res.render('profile', { user: req.user, articles: list });
	});
});

app.post('/profile', function (req, res) {
	var article = new db.users.Article({
		title: req.body.title,
		body: req.body.body,
		author_id: req.user._id
	});
	article.save(function (err) {
		if (err) {
			return console.error(err);
		}
		console.log(article.title + ' added');
		res.redirect('/profile');
	});
});

app.listen(3000);
