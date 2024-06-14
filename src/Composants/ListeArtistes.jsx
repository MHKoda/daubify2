import React, { useState, useEffect } from 'react'
import VueListe from './VueListe';

function ListeArtistes() {

    const [artistes, setArtistes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    let artistesToShow;
    let titreSection;

    if (currentUrl.includes('/liste-artistes')) {
        artistesToShow = artistes
        titreSection = "Tous les artistes"
    } else {
        artistesToShow = artistes.slice(0, 3) // Comportement par défaut
        titreSection = "Artistes en vogue"
    }

    return (
        <div className="sectionArtistes">
            <h1>{titreSection}</h1>

            <div className='artistes'>
                {artistesToShow.map((artiste, index) => (
                    <VueListe
                        groupeInfos="artiste"
                        idInfo={artiste.ID}
                        linkToObject={`artiste/${artiste.ID}`}
                        classImg="artisteImg"
                        imageUrl={artistes[index].acf.photo_de_lartiste.sizes.thumbnail}
                        altImage='yohoho'
                        mainInfo={artiste.post_title}
                    />
                ))}
            </div>
        </div>
    )
}

export default ListeArtistes