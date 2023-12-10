const requireAdmin = (req, res, next) => {
    // esAdmin es una propiedad que nosotros inventamos para agregar al objeto session
    if (!req.session.esAdmin) {
        return res.redirect('/auth/login');
    }
    next();
}



module.exports = {
    requireAdmin
}