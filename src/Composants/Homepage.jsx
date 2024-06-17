import React from "react";
import ListeAlbums from "./ListeAlbums";
import ListeArtistes from "./ListeArtistes";
import FiltreGenresTeintes from "./FiltreGenresTeintes";

function Homepage() {
    return (
        <div className="homepage">
            <ListeArtistes/>
            <ListeAlbums />
        </div>
    )
}

export default Homepage