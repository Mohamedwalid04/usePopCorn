import { useEffect, useState } from "react";
const KEY = "6be50efb";
export function useMovies(query, callback) {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLaoding] = useState(false)
    const [error, setError] = useState("")
    useEffect(() => {
        callback?.()
        const Controller = new AbortController();
        async function getData() {
            try {
                setIsLaoding(true)
                setError("")
                const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: Controller.signal })
                if (!res.ok) throw new Error
                    ("there is problem with fetching")
                const data = await res.json();
                if (data.Response === 'False') throw new Error
                    ("Movie not Found")
                setMovies(data.Search)
                setIsLaoding(false)
            } catch (err) {
                if (err.name !== "AbortError") {

                    setError(err.message)
                }
            } finally {
                setIsLaoding(false)
            }

        }
        if (!query.length) {
            setMovies([])
            setError("");
            return;

        }
        getData()


        return () => {
            Controller.abort()
        }
    }, [query])
    return { movies, isLoading, error }
}