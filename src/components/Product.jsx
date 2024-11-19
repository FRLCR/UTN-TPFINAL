import React from "react";
import './Product.css'
import { NavLink } from "react-router-dom";
function Product({id, name, price, description, image}) {
    return (
        <>
        <div className="product-card" key={id}>
            <h4>{name}</h4>  
            <img src={image}/>         
            <p>{description}</p>
            <p>Precio: ${price}</p>
       <br />

            <NavLink to={`/product/${id}`}>Detalle del producto</NavLink>
        </div>
        </>
    )
}

export default Product;