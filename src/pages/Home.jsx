import { useEffect, useState } from 'react';
import ProductContainer from "../components/ProductContainer";
import { getProductList } from "../utils/peticiones";

function Home() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productList, setProductList] = useState([])

    const fetchProducts = async () => {
        try {
            setProductList( await getProductList());
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true)
        fetchProducts();
    }, []);


    if (loading) {
        return <div>Cargando productos...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }


    return (
        <>
            <ProductContainer products={productList} />
        </>
    )
}

export default Home;