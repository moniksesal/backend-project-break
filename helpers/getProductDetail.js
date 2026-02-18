function getProductDetail(product, context = 'shop') {
    return `
        <h1>${product.name}</h1>
        <img src="${product.image}" alt="${product.name}" style="max-width:300px; display:block; margin-bottom:1rem;">
        <p>Precio: ${product.price}€</p>
        <p>Categoría: ${product.category}</p>
        <p>${product.description}</p>

        ${context === 'dashboard' ? `
            <a href="/dashboard/${product._id}/edit"><button type="button">Editar</button></a>
            <form action="/dashboard/${product._id}?_method=DELETE" method="POST">
                <button type="submit">Borrar</button>
            </form>
        ` : ''}
    `
}

module.exports = getProductDetail
