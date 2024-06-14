import React, { useState, useEffect } from 'react';
import VueListe from './VueListe';

function ListeAlbums() {

    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://web24.mmi-stdie.fr/malo/wp-json/daubify/albums')
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error(`HTTP error! status: ${resp.status}`);
                }
                return resp.json();
            })
            .then((data) => {
                // Trier les données par post_title
                const sortedData = data.sort((a, b) => {
                    if (a.post_title.toLowerCase() < b.post_title.toLowerCase()) return -1;
                    if (a.post_title.toLowerCase() > b.post_title.toLowerCase()) return 1;
                    return 0;
                });

                setAlbums(sortedData);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    let albumsToShow;
    if (currentUrl.includes('/liste-albums')) {
        albumsToShow = albums;
    } else {
        albumsToShow = albums.slice(0, 3); // Comportement par défaut
    }

    return (
        <div className='sectionAlbums'>
            <h1>Ceci est la liste des Albums</h1>

            <div className='albums'>
                {albumsToShow.map((album, index) => (
                    <div >
                        <VueListe
                            groupeInfos="album"
                            idInfo={album.ID}
                            linkToObject={`album/${album.ID}`}
                            imageUrl={albums[index].acf.jaquette_de_lalbum.sizes.thumbnail}
                            altImage='yohoho'
                            mainInfo={album.post_title}
                        />

                        <h4 className="nomArtiste">{albums[index].acf.artiste_principal[0].post_title}</h4>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default ListeAlbums;
