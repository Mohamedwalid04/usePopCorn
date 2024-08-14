import { useEffect, useState } from "react";
const KEY = "6be50efb";
export function useMovies(query) {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLaoding] = useState(false)
    const [error, setError] = useState("")
    useEffect(() => {
        async function getMovies() {
            setIsLaoding(true)
            try {
                setError("")
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
                if (!res.ok) throw new Error
                    ("There is Problem with fetch")
                const data = await res.json()
                if (data.Response === 'False') throw new Error
                    ("Movie not Found")
                console.log(data.Search)
                setMovies(data.Search)
                setIsLaoding(false)
            }
            catch (err) {
                setError(err.message)
            } finally {
                setIsLaoding(false)
            }
        }
        if (!query.length) {
            setMovies([])
            setError("")
        }
        getMovies()
    }, [query])
    return { movies, isLoading, error }
}