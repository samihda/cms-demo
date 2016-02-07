var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db/users');
var routes = require('./routes');


// passport
passport.use(new Strategy(function (username, password ,callback) {
	db.findByUsername(username, function(err, user) {
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
	db.findById(id, function (err, user) {
		if (err) { return callback(err); }
		callback(null, user);
	});
});


// express app
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/api'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
//app.use('/public', express.static(__dirname + '/public'));

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());


// routes
/*app.get('/', function (req, res) {
	res.render('home', { user: req.user });
});

app.get('/signup', function (req, res) {
	res.render('signup');
});

app.post('/signup', function (req, res) {
	var user = new db.User({
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

/*app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
	db.Article.find({author_id: req.user._id}).sort({date: -1}).exec(function (err, list) {
		if (err) {
			return console.error(err);
		}
		res.render('profile', { user: req.user, articles: list });
	});
});

app.post('/profile', function (req, res) {
	var article = new db.Article({
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
});*/


// endpoints
// user authentication
app.post('/api/login', passport.authenticate('local'), function (req, res) {
	//console.log(req);
    console.log(req.body);
    res.json(req.user);
});

app.post('/potato', function (req, res) {
	res.send('potato');
});

app.get('/api/logout', function (req, res) {
	req.logout();
    res.send('logged out!');
	//res.render('layout');
});

app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
	res.render('edit', {article: article});
});


// api
app.get('/api/articles', db.getArticles);
app.get('/api/articles/:id', db.getArticle);


app.get('/', routes.index);
app.get('/*', routes.index);

// start server
app.listen(3000, function () {
	console.log('Express server listening on http://127.0.0.1:3000');
});
