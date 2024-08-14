import { useState } from "react";
import Box from "./Box";
import Loading from "./Loading";
import MoviesList from "./MoviesList";
import Message from "./Message";
import MovieDetails from "./MovieDetails";
import WatchedList from "./WatchedList";

export default function Main({ isLoading, Error, movies, selectedID, handleBack, handleID, handleAddWatch, watched, handleDeleteWatch }) {
    const [isOpen1, setIsOpen1] = useState(true)
    const [isOpen2, setIsOpen2] = useState(true)
    return (
        <main className="main">
            <Box>
                <button className="btn-toggle" onClick={() => setIsOpen1(isOpen1 => !isOpen1)}>
                    {isOpen1 ? "-" : "+"}
                </button>
                {isLoading && <Loading />}
                {isOpen1 && !isLoading && !Error && <MoviesList movies={movies} handleID={handleID} />}
                {Error && <Message Message={Error} />}
            </Box>
            <Box>
                <button className="btn-toggle" onClick={() => setIsOpen2(isOpen2 => !isOpen2)}>
                    {isOpen2 ? "-" : "+"}
                </button>
                {isOpen2 && (selectedID ? <MovieDetails selectedID={selectedID} handleBack={handleBack} handleAddWatch={handleAddWatch} /> : <>
                    <WatchedList watched={watched} handleDeleteWatch={handleDeleteWatch} />
                </>)}
            </Box>
        </main>
    )
}
