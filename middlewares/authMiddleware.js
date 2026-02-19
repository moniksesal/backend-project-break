//BONUS

function isLoggedIn(req, res, next) {
    // si existe una sesión y un usuario, seguimos
    if (req.session && req.session.user) { 
        return next()
    } else {
        // si no, redirigimos al login con el mensaje
        return res.redirect('/login?error=Must login first')
    }
}

module.exports = isLoggedIn