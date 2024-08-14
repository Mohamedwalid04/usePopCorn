/* eslint-disable react/prop-types */
import Search from "./Search";

export default function Nav({ query, setQuery, movies }) {
    return (
        <nav className='nav-bar'>
            <div className='logo'>
                <span>🍿</span>
                <h1>usePopCorn</h1>
            </div>
            <Search query={query} setQuery={setQuery} />
            <h3 className="num-results">
                <span>{movies?.length} </span>Movies Found
            </h3>
        </nav>
    )
}
