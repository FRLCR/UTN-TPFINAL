import './ProductDetail.css'
import { useState, useEffect} from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { getProduct } from "../utils/peticiones";
import noimage from '../assets/noimage.png'

function ProductDetail() {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProduct = async () => {
        try {
           setProduct(await getProduct(id)) 
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct()
    }, []); 

    if (loading) {
        return <div>Cargando producto...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="product-detail">            
            <h1>{product.name}</h1>
            <img src={noimage} className="product-image" />
            <p>{product.desc}</p>
            <p className="product-price">Precio: ${product.price}</p>
            <p className="product-sku">SKU: {product.sku}</p>
            <button className="buy-button" onClick={() => alert("Agregado al carrito!")}>Comprar</button>
            <br />
            <NavLink to="/" className="back-button">Volver</NavLink>
        </div>
    )
}
export default ProductDetail;