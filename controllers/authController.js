const { template } = require('../helpers/template')

const loginController = {
    showLoginForm: async (req, res) => {
        const html = template(
            'Login',
            `
            <nav class="login-nav">
                <a href="/products">Volver al escaparate</a>
            </nav>
            <div class="login-container">
                <h2>Login</h2>
                <form method="POST" action="/login" class="login-form">
                    <input type="text" name="username" placeholder="Usuario" required />
                    <input type="password" name="password" placeholder="Contraseña" required />
                    <button type="submit">Entrar</buton>
                </form>
            </div>
            `, 'login'
        )
        res.send(html)
    },

    login: (req, res) => {
        const {username, password} = req.body

        if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
            req.session.user = username //si el user y pass coinciden con el .env, el usuario queda logueado
            return res.redirect('/dashboard')
        }

        res.send('incorrect user or password')
    },

    logout: (req, res) => {
        req.session.destroy(err => {
            if (err) {
                console.error(err)
                return res.status(500).send('Error logout')
            }
            res.redirect('/login')
        })
    }
}

module.exports = loginController