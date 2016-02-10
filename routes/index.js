exports.index = function (req, res) {
    console.log(req.user);
	res.render('layout', { user: req.user });
};
