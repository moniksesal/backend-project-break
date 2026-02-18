function getNavBar(context) {
    if (context === 'dashboard') {
        return `
            <nav>
                <a href="/products">Productos</a>
                <a href="/?category=Camisetas">Camisetas</a>
                <a href="/?category=Pantalones">Pantalones</a>
                <a href="/?category=Zapatos">Zapatos</a>
                <a href="/?category=Accesorios">Accesorios</a>
                <a href="/dashboard/new">Nuevo Producto</a>
                <a href="/logout">Logout</a>
            </nav>
        `
    } else {
        return `
            <nav>
                <a href="/products">Productos</a>
                <a href="/?category=Camisetas">Camisetas</a>
                <a href="/?category=Pantalones">Pantalones</a>
                <a href="/?category=Zapatos">Zapatos</a>
                <a href="/?category=Accesorios">Accesorios</a>
                <a href="/login">Login</a>
            </nav>

        `
    }
}

module.exports = {getNavBar}