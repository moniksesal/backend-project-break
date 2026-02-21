function getProductDetail(product, context = 'shop') {
    return `
        <div class="product-detail">
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}">
            <p>Precio: ${product.price}€</p>
            <p>Categoría: ${product.category}</p>
            <p>${product.description}</p>
            <p>Talla: ${product.size}</p>
        

        ${context === 'dashboard' ? `
            <div class="btncontainer">
                <a href="/dashboard/${product._id}/edit" class="btn-editar">Editar</a>
                <form action="/dashboard/${product._id}?_method=DELETE" method="POST">
                    <button type="submit">Borrar</button>
                </form>
            </div>
        ` : ''}
        </div>
    `
}

module.exports = getProductDetail
