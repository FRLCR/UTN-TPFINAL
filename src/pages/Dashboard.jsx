import React from 'react';
import { useEffect, useState } from 'react';
import { deleteProduct, getProductList, newProduct } from '../utils/peticiones';
import "./Dashboard.css"

function Dashboard() {

    const [productList, setProductList] = useState([])
    const [product, setProduct] = useState({
        name: '',
        price: '',
        stock: '',
        sku: ''
    });

    const fetchProducts = async () => {
        try {
            setProductList(await getProductList());
        } catch (err) {
            setError("Hubo un error al obtener los productos.");
        }
    };

    useEffect(() => {

        fetchProducts();
    }, []);


    const handleDelete = (id) => {
        const del = confirm("Deseas elimina el producto?")

        if (del) {
            deleteProduct(id)
            fetchProducts();
        }
    }

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            newProduct(product);
            fetchProducts();
            setProduct({ name: '', price: '', stock: '', sku: '' });
        } catch (err) {
            console.error("Hubo un error al agregar el producto:", err);
        }
    };

    return (
        <div className="dashboard">
            <div className="dash-product-list">
                <h1>Tus Productos</h1>
                <table>

                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>SKU</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                                <td>{product.sku}</td>
                                <td>
                                    <button className="editbutton dashboard-action-button">Editar</button>
                                    <button className="deletebutton dashboard-action-button" onClick={() => handleDelete(product.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="product-form">
                <h2>Agregar Nuevo Producto</h2>
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
                        <button type="submit">Agregar Producto</button>
                    </div>

                </form>
            </div>
        </div>
    );
}
export default Dashboard;