function getProductFormEdit(product = {}, action = '/dashboard', method = 'POST') {
    return `
        <form action="${action}" method="${method}" enctype="multipart/form-data">
            <label>Nombre</label>
            <input type="text" name="name" value="${product.name || ''}" required>

            <label>Descripción</label>
            <textarea name="description" required>${product.description || ''}</textarea>

            <label>Precio</label>
            <input type="number" name="price" value="${product.price || ''}" required>

            <label>Imagen</label>
            <input type="file" name="image" accept="image/*" ${product._id ? '' : 'required'}>

            <label>Categoría</label>
            <select name="category" required>
                <option ${product.category === 'Camisetas' ? 'selected' : ''}>Camisetas</option>
                <option ${product.category === 'Pantalones' ? 'selected' : ''}>Pantalones</option>
                <option ${product.category === 'Zapatos' ? 'selected' : ''}>Zapatos</option>
                <option ${product.category === 'Accesorios' ? 'selected' : ''}>Accesorios</option>
            </select>

            <label>Talla</label>
            <select name="size" required>
                <option ${product.size === 'XS' ? 'selected' : ''}>XS</option>
                <option ${product.size === 'S' ? 'selected' : ''}>S</option>
                <option ${product.size === 'M' ? 'selected' : ''}>M</option>
                <option ${product.size === 'L' ? 'selected' : ''}>L</option>
                <option ${product.size === 'XL' ? 'selected' : ''}>XL</option>
            </select>

            <button type="submit">Guardar</button>
            <button type="button" onclick="window.location='/dashboard'">Cancelar</button>
        </form>
    `
}

module.exports = getProductFormEdit