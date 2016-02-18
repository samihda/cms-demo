var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');
var articles = require('./api/articles');
//var users = require('./api/users');
var routes = require('./routes');
var el = require('connect-ensure-login');


// passport
passport.use(new Strategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());


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

app.use(routes.error);


// user authentication endpoints
app.post('/api/login', function (req, res) {
    passport.authenticate('local', function (err, user, info) { // fix error handling!
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

app.post('/api/signup', function (req, res, next) {
    db.User.register(new db.User({
        username: req.body.username,
        email: req.body.email
    }),
    req.body.password,
    function (err) {
        if (err) {
            return console.error(err);
        }
        console.log(req.body.username + ' inserted');
        next();
    });
}, passport.authenticate('local'), function (req, res) {
    res.json({ message: req.user.username + ' added.'});
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
