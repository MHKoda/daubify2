import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SingleAlbum() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://web24.mmi-stdie.fr/malo/wp-json/daubify/albums`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
        return resp.json();
      })
      .then((data) => {
        const albumData = data.find(album => album.ID === parseInt(id));
        if (albumData) {
          setAlbum(albumData);
        } else {
          setError('Album not found');
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
    <div>
      <h1>{album.post_title}</h1>
      <img src={album.acf.jaquette_de_lalbum.sizes.thumbnail} alt={album.post_title} />
      <p>{album.acf.description}</p>
      <h4>{album.acf.artiste_principal[0].post_title}</h4>
    </div>
  );
}

export default SingleAlbum;