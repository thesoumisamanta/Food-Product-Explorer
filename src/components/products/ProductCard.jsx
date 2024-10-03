import { Link } from "react-router-dom"

export default function ProductCard({product}){
    return (
        <div className="border rounded p-4">
            <img src={product.image_url} alt={product.product_name} className=" h-32 " />
            <h2 className="text-lg font-bold">{product.product_name}</h2>
            <p>Category: {product.categories}</p>
            <p>Nutrition Grade: {product.nutrition_grades}</p>
            <Link to={`/product/${product.id}`} className="text-blue-500">View Details</Link>
        </div>
    )
}