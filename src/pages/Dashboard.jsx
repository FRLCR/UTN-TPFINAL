import { useEffect, useState } from 'react';
import { deleteProduct, getProductList, newProduct } from '../utils/peticiones';
import "./Dashboard.css"
import ProductForm from '../components/ProductForm';
import { useNavigate } from "react-router-dom"; 


function Dashboard() {

    const [productList, setProductList] = useState([])
    const navigate = useNavigate(); 

    const fetchProducts = async () => {
        try {
            setProductList(await getProductList());
        } catch (err) {
            console.error(err)
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

    const createProduct = (product) => {  
        newProduct(product)
        fetchProducts()
    }

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
                            <th>Descripccion</th>
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
                                <td>{product.desc}</td>
                                <td>{product.sku}</td>
                                <td>
                                    <button className="editbutton dashboard-action-button" onClick = {() => navigate(`/admin/dashboard/productmodify/${product.id}`)}>Editar</button>
                                    <button className="deletebutton dashboard-action-button" onClick={() => handleDelete(product.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ProductForm create={createProduct} accion={"Agregar Nuevo Producto"} mode={{mode: false, id: null}} ></ProductForm>           
        </div>
    );
}
export default Dashboard;