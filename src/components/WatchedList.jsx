export default function WatchedList({ watched, handleDeleteWatch }) {
    return (
        <ul className="list">
            {watched?.map((movie) => <WatchedMovie movie={movie} key={movie} handleDeleteWatch={handleDeleteWatch} />)}
        </ul>
    )
}

function WatchedMovie({ movie, handleDeleteWatch }) {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.Title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
            <button className="btn-delete" onClick={() => handleDeleteWatch(movie.imdbId)}>X</button>
        </li>
    )
}