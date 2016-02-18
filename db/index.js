var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
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
    email: String
});

UserSchema.plugin(passportLocalMongoose); // passportLocalMongoose completes the schema

exports.Article = mongoose.model('Article', ArticleSchema);
exports.User = mongoose.model('User', UserSchema);
