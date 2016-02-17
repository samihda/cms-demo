var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');
var articles = require('./api/articles');
var users = require('./api/users');
var routes = require('./routes');
var el = require('connect-ensure-login');


// passport
passport.use(new Strategy(function (username, password ,callback) {
	users.findByUsername(username, function(err, user) {
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
	users.findById(id, function (err, user) {
		if (err) { return callback(err); }
		callback(null, user);
	});
});


// express app
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public')); // access resources under '/public' from '/'
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(err, req, res, next) {
    console.error(err);
    res.status(500);
    res.render('error', {error: err});
});


// user authentication endpoints
app.post('/api/login', function (req, res) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return console.error(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'invalid login' });
        }
        req.logIn(user, function (err) {
            if (err) { return console.error(err); }
            return res.json({ message: 'login successful' });
        });
    })(req, res);
});

app.get('/api/logout', function (req, res) {
	req.logout();
    res.json({ message: 'logged out' });
});

app.post('/api/signup', function (req, res, next) { // sign up and authenticate right away
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
        next();
	});
}, passport.authenticate('local'), function (req, res) {
    res.json({ message: req.user.username + ' added.' });
});


// api endpoints
app.get('/api/public', articles.getArticles);
app.get('/api/public/:id', articles.getArticle);
app.get('/api/protected', el.ensureLoggedIn('/'), articles.getUserArticles); // user id has to be in the req.user (loggedin state)
app.post('/api/protected', el.ensureLoggedIn('/'), articles.postArticle);
app.put('/api/protected/:id', el.ensureLoggedIn('/'), articles.updateArticle);
app.delete('/api/protected/:id', el.ensureLoggedIn('/'), articles.deleteArticle);


// routes
app.get('/', routes.index);
app.get('/*', routes.index);


// server
app.listen(3000, function () {
	console.log('Express server listening on http://127.0.0.1:3000');
});
