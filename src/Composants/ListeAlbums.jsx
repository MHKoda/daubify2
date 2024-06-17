import React, { useState, useEffect, useRef } from 'react';
import VueListe from './VueListe';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function ListeAlbums() {
    const [albums, setAlbums] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
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
                console.log(data)
                const sortedData = data.sort((a, b) => {
                    if (a.post_title.toLowerCase() < b.post_title.toLowerCase()) return -1;
                    if (a.post_title.toLowerCase() > b.post_title.toLowerCase()) return 1;
                    return 0;
                });

                setAlbums(sortedData);
                setFilteredAlbums(sortedData);
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
        albumsToShow = filteredAlbums;
        titreSection = "Tous les Albums"
    } else {
        albumsToShow = filteredAlbums.slice(0, 3); // Comportement par défaut
        titreSection = "Albums les plus streamés"
    }

    return (
        <div className='sectionAlbums'>
            <SearchBar 
                list={albums} 
                setList={setFilteredAlbums} 
                filterField={album => album.post_title || ""} // S'assurer que filterField retourne une chaîne
                placeholder='album'
            />
            <h1>{titreSection}</h1>

            <div ref={albumsRef} id='albums' className='albums'>
                {albumsToShow.map((album, index) =>
                    <div key={album.ID}>
                        <Link to={`/album/${album.ID}`}>
                            <VueListe
                                groupeInfos="album"
                                idInfo={album.ID}
                                linkToObject={`album/${album.ID}`}
                                imageUrl={album?.acf?.jaquette_de_lalbum?.sizes?.thumbnail || 'default_image_url'}
                                altImage='yohoho'
                                mainInfo={album.post_title}
                            />
                        </Link>
                        <h4 className="nomArtiste">{album?.acf?.artiste_principal?.[0]?.post_title || 'Unknown Artist'}</h4>
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