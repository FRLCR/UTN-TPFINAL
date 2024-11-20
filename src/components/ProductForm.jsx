
import { useEffect, useState } from 'react';
import { deleteProduct, getProductList, newProduct } from '../utils/peticiones';
import './ProductForm.css'

function ProductForm({ accion, create }) {

    const [product, setProduct] = useState({
        name: '',
        price: '',
        stock: '',
        sku: '',
        desc: '',
    });

    const clearProduct = () => {
        setProduct({ name: '', price: '', stock: '', sku: '', desc: "" });
    }
    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        create(product)
        clearProduct();
    }

    return (
        <div className="product-form">
            <h2>{accion}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Precio</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Descripccion</label>
                    <input
                        type="text"
                        name="desc"
                        value={product.desc}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>SKU</label>
                    <input
                        type="text"
                        name="sku"
                        value={product.sku}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='container-submit-button'>
                    <button type="submit">{accion}</button>
                </div>

            </form>
        </div>
    )
}

export default ProductForm