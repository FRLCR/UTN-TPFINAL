import { useEffect, useState } from 'react';
import {getProduct } from '../utils/peticiones';
import './ProductForm.css'

function ProductForm({ accion, create, mode, modifyProduct }) {

    const [product, setProduct] = useState({
        name: '',
        price: '',
        stock: '',
        sku: '',
        desc: '',
    });


    const fetchProduct = async () => {
        try {
           setProduct(await getProduct(mode.id)) 
        } catch (err) {
           console.error(err)
        }
    };

    useEffect(() => {
         if (mode.edit === true){
            fetchProduct()
        }
    }, []); 


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

        if (mode.edit === true) {
            const isConfirmed = confirm("Estas seguro que quieres modificar este producto?")
            if (isConfirmed) {
                modifyProduct(product)
            }
        } else {
            create(product)
        }
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