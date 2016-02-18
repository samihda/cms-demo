exports.index = function (req, res) {
    console.log(req.user);
	res.render('layout', { user: req.user });
};

exports.unauthorized = function (err, req, res, next) {
    console.error(err);
    res.status(401);
    res.render('error', {error: 'Please login.'});
}

exports.error = function (err, req, res, next) {
    console.error(err);
    res.status(500);
    res.render('error', {error: err});
};
