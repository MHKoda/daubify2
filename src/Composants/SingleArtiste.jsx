import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SingleArtiste() {
  const { id } = useParams();
  const [artiste, setArtiste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://web24.mmi-stdie.fr/malo/wp-json/daubify/artistes`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
        return resp.json();
      })
      .then((data) => {
        const artisteData = data.find(artiste => artiste.ID === parseInt(id));
        if (artisteData) {
          setArtiste(artisteData);
          console.log(artisteData);
        } else {
          setError('Artiste not found');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='containerDetails'>
      <div className='artisteDetails'>
      <img className='backgroundImg' src={artiste.acf.photo_de_lartiste.sizes.medium_large} alt={`Photo de(s) ` + artiste.post_title} />
        <img src={artiste.acf.photo_de_lartiste.sizes.thumbnail} alt={`Photo de(s) ` + artiste.post_title} />
        <h1>{artiste.post_title}</h1>
        <p className='biographie'>{artiste.acf.biographie}</p>
      </div>
    </div>
  );
}

export default SingleArtiste;