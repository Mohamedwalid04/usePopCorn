export default function MoviesList({ movies, handleID }) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie, i) => <Movie key={i} movie={movie} handleID={handleID} />)}
        </ul>
    )
}

function Movie({ movie, handleID }) {
    return (
        <li onClick={() => handleID(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    )
}
