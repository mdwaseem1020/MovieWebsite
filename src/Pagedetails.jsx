import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';

export default function Pagedetails() {
    const location = useLocation();
    const moviedetails = location.state.x;
    const [trailer, setTrailer] = useState('');

    async function trail(id) {
        try {
            const response = await fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=c202f0c11aa8b52272804f5b020a8667`);
            const data = await response.json();
            if (data.results && data.results.length > 1) {
                setTrailer(data.results[1].key);
            } else {
                console.error("Trailer not found");
            }
        } catch (error) {
            console.error("Error fetching trailer:", error);
        }
    }

    return (
        <div className="details-container">
            <div >
                <img 
                    style={{ width: '40%', height: '40%' }} 
                    src={`https://image.tmdb.org/t/p/original/${moviedetails.backdrop_path}`} 
                    alt="movie poster" 
                />
                <h1>Name: {moviedetails.title}</h1>
                <p>About the movie: {moviedetails.overview}</p>
                <h3>Rating: {moviedetails.vote_average}</h3>
                <button onClick={() => trail(moviedetails.id)}>Watch Trailer</button>
                <div className="youtube-container">
                    {trailer && <YouTube videoId={trailer} opts={{ height: '230', width: '100%' }} />}
                </div>
            </div>
        </div>
    );
}
