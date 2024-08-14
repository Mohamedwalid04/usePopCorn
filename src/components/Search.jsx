export default function Search({ query, setQuery }) {
    return (
        <div>
            <input className="search" value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search" />
        </div>
    )
}
