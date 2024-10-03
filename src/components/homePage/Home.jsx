import SearchBar from "../filter/searchBar";
import ProductList from "../products/ProductList";

export default function Home(){
    return (
        <div className="container mx-auto p-4">
            <SearchBar />
            <ProductList />
        </div>
    )
}