const router = require('express').Router(),
    passport = require('passport');


router.get('/login', (request, response) => {
    if (request.isAuthenticated()) response.redirect('/admin');
    response.render('login');

})

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: false
    })
);

module.exports = router;