/**
 * Created by shenlin on 20/11/2017.
 */


module.exports = {
    authenticationMiddleware: function () {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated()) return next();
        res.redirect('/account/login')
        }
    }
};