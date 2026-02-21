//Genera las tarjetas de productos
function getProductCards(products, context = 'shop') {
    let html = ''

    for (let product of products) {

        const basePath = context === 'dashboard'
            ? '/dashboard'
            : '/products'

        let adminButtons = ''
        if (context === 'dashboard') {
            adminButtons = `
                <a href="/dashboard/${product._id}/edit" class="btn">Editar</a>
                <form action="/dashboard/${product._id}/?_method=DELETE" method="POST" style="display:inline" class="delete">
                    <button type="submit" class="deletebtn">Eliminar</button>
                </form>
            ` // no hay forma de enviar un DELETE si no es con un form (no se puede solo con a)
        }

        html += `
            <div class="product-card">
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}">
                <a href="${basePath}/${product._id}" class="vermas">Ver más</a>
                ${adminButtons}
            </div>
        `
    }
    return html
}

module.exports = getProductCards