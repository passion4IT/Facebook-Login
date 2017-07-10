/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, ok) {
    if (ireq.isAuthenticated()) return ok();
    else return res.redirect("/login");
};