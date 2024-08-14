import { useEffect, useState } from "react"
import Loading from "./Loading"
import RatingStars from "../RatingStars";
const KEY = "6be50efb";
export default function MovieDetails({ selectedID, handleBack, handleAddWatch }) {
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [userRating, setOnRating] = useState(0)
    const { Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie


    function onAdd() {
        const newWatchedMovie = {
            imdbId: selectedID,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating
        }
        handleAddWatch(newWatchedMovie)
        handleBack()
    }

    useEffect(() => {
        function callback(e) {
            if (e.code === "Escape") {
                handleBack()
                console.log("close")
            }
        }


        document.addEventListener('keydown', callback)

        return () => {
            document.removeEventListener('keydown', callback)
        }
    }, [handleBack])

    useEffect(() => {
        async function getMovieDetails() {
            try {
                setIsLoading(true)
                const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`)
                const data = await res.json()
                setMovie(data)
                setIsLoading(false)
            } catch (err) {
                console.log(err.message)
            } finally {
                setIsLoading(false)
            }
        }
        getMovieDetails()
    }, [selectedID])

    useEffect(() => {
        if (!title) return;
        document.title = `Movie: ${title}`
        return () => {
            document.title = "usePopCorn"
        }
    }, [title])
    return <div className="details">
        {isLoading ? <Loading /> : <>
            <header>
                <button className="btn-back" onClick={handleBack}>&larr;</button>
                <img src={poster} alt={`Poster of ${title}`} />
                <div className="details-overview">
                    <h2>{title}</h2>
                    <p>
                        {released} &bull; {runtime}
                    </p>
                    <p>{genre}</p>
                    <p><span>⭐</span>{imdbRating} Imdb Rating</p>
                </div>
            </header>
            <section>
                <div className="rating">
                    <RatingStars maxRating={10} size={24} setOnRating={setOnRating} />
                    {userRating > 0 && (<button className="btn-add" onClick={onAdd}>+ Add to list</button>)}
                </div>
                <p><em>{plot}</em></p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
            </section>
        </>}
    </div>
}
