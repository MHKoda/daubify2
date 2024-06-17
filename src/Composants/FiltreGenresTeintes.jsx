import React from 'react'

function FiltreGenresTeintes({ genres, selectedGenre, onGenreChange, teintes, selectedTeinte, onTeinteChange }) {

    return (
        <div className="filtres">
            <select value={selectedGenre} onChange={e => onGenreChange(e.target.value)}>
                <option value="">Tous les genres</option>
                {genres.map((genre, index) => (
                    <option key={index} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>

            <select value={selectedTeinte} onChange={e => onTeinteChange(e.target.value)}>
                <option value="">Toutes les teintes</option>
                {teintes.map((teinte, index) => (
                    <option key={index} value={teinte}>
                        {teinte}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default FiltreGenresTeintes