import ProductForm from '../components/ProductForm';
import './EditProduct.css'
import { useParams, useNavigate } from "react-router-dom";
import {updateProduct } from '../utils/peticiones';

function EditProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const modifyProduct = (p) => {
        updateProduct(p)
        navigate(-1)
    }

    return (
        <div className='edit-page'>
            <ProductForm accion={"Editar Producto"} mode={{ edit: true, id: id }} modifyProduct={modifyProduct} />
        </div>

    )
}

export default EditProduct