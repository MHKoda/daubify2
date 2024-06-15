import React, { useState, useEffect, useRef } from 'react';
import VueListe from './VueListe';
import { Link } from 'react-router-dom';

function ListeAlbums() {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const albumsRef = useRef(null);
    const boutonToutVoirRef = useRef(null);

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

    useEffect(() => {
        const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

        if (currentUrl.includes('/liste-albums')) {
            if (albumsRef.current) {
                albumsRef.current.classList.add('vueListeComplete');
            }
            if (boutonToutVoirRef.current) {
                boutonToutVoirRef.current.classList.add('boutonToutVoir');
            }
        }
    }, [albums]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    let albumsToShow;
    let titreSection;

    if (currentUrl.includes('/liste-albums')) {
        albumsToShow = albums;
        titreSection = "Tous les Albums"
    } else {
        albumsToShow = albums.slice(0, 3); // Comportement par défaut
        titreSection = "Albums les plus streamés"
    }

    return (
        <div className='sectionAlbums'>
            <h1>{titreSection}</h1>

            <div ref={albumsRef} id='albums' className='albums'>
                {albumsToShow.map((album, index) =>
                    <div key={album.ID}>
                        <Link to={`/album/${album.ID}`}>
                            <VueListe
                                groupeInfos="album"
                                idInfo={album.ID}
                                linkToObject={`album/${album.ID}`}
                                imageUrl={albums[index].acf.jaquette_de_lalbum.sizes.thumbnail}
                                altImage='yohoho'
                                mainInfo={album.post_title}
                            />
                        </Link>
                        <h4 className="nomArtiste">{albums[index].acf.artiste_principal[0].post_title}</h4>
                    </div>
                )}
            </div>

            <div id='boutonToutVoir' ref={boutonToutVoirRef}>
                <button><Link to={'/liste-albums'}>Tout voir</Link></button>
            </div>
        </div>
    )
}

export default ListeAlbums;