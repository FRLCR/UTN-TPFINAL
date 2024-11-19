import React from "react";
import './ProductDetail.css'
import { useState, useEffect} from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { getProduct } from "../utils/peticiones";

function ProductDetail() {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProduct = async () => {
        try {
           setProduct(getProduct(id))
        } catch (err) {
            setError("Hubo un error al obtener el producto.");
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
            <h1>{product.title}</h1>
            <img src={product.image} className="product-image" />
            <p>{product.description}</p>
            <p className="product-price">Precio: ${product.price}</p>
            <button className="buy-button">Comprar</button>
            <br />
            <NavLink to="/" className="back-button">Volver</NavLink>
        </div>
    )
}
export default ProductDetail;