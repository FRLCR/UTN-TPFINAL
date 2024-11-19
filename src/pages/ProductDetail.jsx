import React from "react";
import './ProductDetail.css'
import { useState, useEffect} from 'react';
import { useParams, NavLink } from 'react-router-dom';

function ProductDetail() {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar el producto');
                }
                return response.json();
            })
            .then(data => {
                setProduct(data);
                setLoading(!loading);
            })
            .catch(err => {
                setError(err.message);
                setLoading(!loading);
            });
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