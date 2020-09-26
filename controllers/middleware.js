module.exports.notAuthenticated = (req, res, next) => {
    if (req.session.userObj) {
        return res.redirect('/secret')
    }
    next();
}

module.exports.authenticated = (req, res, next) => {
    if (req.session.userObj) {
        return next();
    }
    res.redirect('/')
}