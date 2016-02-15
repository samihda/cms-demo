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
