import { useDispatch } from "react-redux"
import { setSearchTerm } from "../../redux/filtersSlice"

export default function SearchBar(){

    const dispatch = useDispatch()

    const handleSearch = (e) => {
        e.preventDefault()
        dispatch(setSearchTerm(e.target.value))
    }

    return (
        <input onChange={handleSearch} type="text" placeholder="search products..." className="w-full p-2 border border-gray-300" />
    )
}