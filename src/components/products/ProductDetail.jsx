import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductDetail(){

    const {id} = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${id}.json`);
            setProduct(response.data.product)
        }
        fetchProducts()
    }, [id]);

    return product ? (
        <div className="p-4">
            <img src={product.image_url} alt={product.product_name} className="w-full h-64 object-cover" />
            <h1 className="text-2xl font-bold">{product.product_name}</h1>
            <p>Ingredients: {product.ingredients_text}</p>
            <p>Nutrition Grade: {product.nutrition_grades}</p>
            <p>Energy: {product.nutriments.energy} kcal</p>
            {/* Add more nutritional information here */}
        </div>
    ) : (
        <p>Loading...</p>
    );
}