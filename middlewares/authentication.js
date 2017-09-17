module.exports = function(request, response, next) {
    const except = ['/', '/login'];
    if (except.includes(request.path) || request.isAuthenticated()) {
        return next();
    }
    return response.redirect('/login');
}