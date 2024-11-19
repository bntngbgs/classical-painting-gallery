import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './Gallery.scss';

const Gallery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPainting = async () => {
    try {
      const data = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=*&hasImages=true`
      );

      if (!data.ok) {
        throw new Error('Error Getting Painting ID');
      }

      const result = await data.json();

      const paintingId = result.objectIDs.slice(0, 199);
      console.log(paintingId);

      const paintData = await getPaintingData(paintingId);
      return paintData;
    } catch (err) {
      setError(err);
    }
  };

  const getPaintingData = (id) => {
    const paintID = id.map((item) => {
      return fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${item}`
      )
        .then((res) => res.json())
        .then((paintData) => {
          if (
            paintData.artistDisplayName !== '' &&
            paintData.primaryImage &&
            paintData.title !== '' &&
            paintData.classification === 'Paintings'
          ) {
            return paintData;
          } else {
            return '';
          }
        });
    });

    return Promise.all(paintID).then((results) => {
      return results;
    });
  };

  useEffect(() => {
    const getpainting = async () => {
      setError(null);
      try {
        const paintingData = await getPainting();

        const resultData = paintingData.filter((item, index) => {
          return (
            index ===
              paintingData.findIndex((obj) => {
                return item.objectID === obj.objectID;
              }) && item !== ''
          );
        });

        setData(resultData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    getpainting();
  });

  return (
    <div className="gallery">
      <h1>Gallery</h1>
      {loading && <div className="loader"></div>}
      {error && <p className="error-message">{error.message}</p>}
      {data && (
        <ul>
          {data.slice(0, 16).map((item) => {
            return (
              <Card
                key={item.objectID}
                imgUrl={item.primaryImage}
                title={item.title}
                artist={item.artistDisplayName}
                year={item.accessionYear}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Gallery;
