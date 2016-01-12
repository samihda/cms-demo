var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');

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

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

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
		console.log(err);
		}
		else {
		console.log(user.username + ' inserted');
		}
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

app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
	console.log(req.user);
	res.render('profile', { user: req.user });
});

app.post('/profile', function (req, res) {
	var article = new db.users.Article({
		title: req.body.title,
		body: req.body.body
	});
	var articleArray;
	db.users.User.findOne({_id: req.user._id}, {password: 0}, function (err, user) {
		if (err) {
			console.log(err);
		}
		else {
			console.log('profile for: ' + user);
			user.articles.push(article);
			user.save(function (err) {
				if (err) {
					console.log(err);
				}
				else {
					console.log('updated');
				}
			});
		}
    });
	/*db.users.User.findAndModify({
		query: {_id: req.user._id},
		update: {
			$push: {articles: article}
		}
	}, function (err, doc) {
		if (err) {
			console.log(err);
		}
		else {
			console.log('article added');
		}
	});*/
	res.redirect('/profile');
});

app.listen(3000);
