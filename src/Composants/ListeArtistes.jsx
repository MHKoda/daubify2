import React, { useState, useEffect, useRef } from 'react'
import VueListe from './VueListe';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function ListeArtistes() {

    const [artistes, setArtistes] = useState([]);
    const [filteredArtistes, setFilteredArtistes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const artistesRef = useRef(null);
    const boutonToutVoirRef = useRef(null);

    useEffect(() => {
        fetch('https://web24.mmi-stdie.fr/malo/wp-json/daubify/artistes')
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error(`HTTP error! status: ${resp.status}`);
                }
                return resp.json();
            })
            .then((data) => {
                const sortedData = data.sort((a, b) => {
                    if (a.post_title.toLowerCase() < b.post_title.toLowerCase()) return -1;
                    if (a.post_title.toLowerCase() > b.post_title.toLowerCase()) return 1;
                    return 0;
                });

                setArtistes(sortedData);
                setFilteredArtistes(sortedData);
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

        if (currentUrl.includes('/liste-artistes')) {
            if (artistesRef.current) {
                artistesRef.current.classList.add('vueListeComplete');
            }
            if (boutonToutVoirRef.current) {
                boutonToutVoirRef.current.classList.add('boutonToutVoir');
            }
        }
    }, [artistes]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    let artistesToShow;
    let titreSection;

    if (currentUrl.includes('/liste-artistes')) {
        artistesToShow = filteredArtistes
        titreSection = "Tous les artistes"
    } else {
        artistesToShow = filteredArtistes.slice(0, 3) // Comportement par défaut
        titreSection = "Artistes en vogue"
    }

    return (
        <div className="sectionArtistes">
            <SearchBar
                list={artistes}
                setList={setFilteredArtistes}
                filterField={artiste => artiste.post_title || ""} // S'assurer que filterField retourne une chaîne
                placeholder='artiste'
            />

            <h1>{titreSection}</h1>

            <div ref={artistesRef} className='artistes'>
                {artistesToShow.map((artiste, index) =>
                    <div key={artiste.ID}>
                        <Link to={`/artiste/${artiste.ID}`}>
                            <VueListe
                                groupeInfos="artiste"
                                idInfo={artiste.ID}
                                linkToObject={`artiste/${artiste.ID}`}
                                classImg="artisteImg"
                                imageUrl={artiste?.acf?.photo_de_lartiste?.sizes?.thumbnail || 'default_image_url'}
                                altImage='yohoho'
                                mainInfo={artiste?.post_title}
                            />
                        </Link>
                    </div>
                )}
            </div>

            <div id='boutonToutVoir' ref={boutonToutVoirRef}>
                <button><Link to={'/liste-artistes'}>Tout voir</Link></button>
            </div>
        </div>
    )
}

export default ListeArtistes