import { useState } from "react";
import Main from "./components/Main";
import Nav from "./components/Nav";
import { useMovies } from "./useMovies";

export default function App() {
  const [query, setQuery] = useState("interstellar")
  const [selectedID, setSelectedID] = useState(null)
  const [watched, setWatched] = useState([])
  const { movies, isLoading, error } = useMovies(query, handleBack)
  function handleBack() {
    setSelectedID(null)
  }
  function handleID(id) {
    setSelectedID(id)

  }
  function handleAddWatch(watchedMovie) {
    setWatched((watched) => [...watched.filter((el) => el.imdbId !== watchedMovie.imdbId), watchedMovie])
  }
  function handleDeleteWatch(id) {
    setWatched((watched) => [...watched.filter((el) => el.imdbId !== id)])
  }
  return (
    <>
      <Nav query={query} setQuery={setQuery} movies={movies} />
      <Main isLoading={isLoading} Error={error} movies={movies} selectedID={selectedID} handleDeleteWatch={handleDeleteWatch} handleBack={handleBack} handleID={handleID} handleAddWatch={handleAddWatch} watched={watched} />
    </>
  )
}


