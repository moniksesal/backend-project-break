//Genera las tarjetas de productos
function getProductCards(products, context = 'shop') {
    let html = ''

    for (let product of products) {
        let adminButtons = ''
        if (context === 'dashboard') {
            adminButtons = `
                <a href="/dashboard/${product._id}/edit">Editar</a>
                <form action="/dashboard/${product._id}/?_method=DELETE" method="POST" style="display:inline">
                    <button type="submit">Eliminar</button>
                </form>
             
            `
        }

        html += `
            <div class="product-card">
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}">
                <button><a href="/products/${product._id}">Ver más</a></button>
                ${adminButtons}
            </div>
        `
    }
    return html
}

module.exports = getProductCards