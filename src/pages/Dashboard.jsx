import React from 'react';
import { useEffect, useState } from 'react';
import { getProductList } from '../utils/peticiones';
import "./Dashboard.css"

function Dashboard () {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productList, setProductList] = useState([])

    const fetchProducts = async () => {
        try {
            setProductList( await getProductList());
        } catch (err) {
            setError("Hubo un error al obtener los productos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true)
        fetchProducts();
    }, []);

    return (
        <div className="dashboard">
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
                                <button onClick={() => handleEdit(product.id)}>Editar</button>
                                <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
