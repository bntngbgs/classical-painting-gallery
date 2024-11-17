import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './Gallery.scss';

const Gallery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPainting = async () => {
    return fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=*&hasImages=true`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error Getting Painting ID');
        }
        return res.json();
      })
      .then(async (data) => {
        let paintCollection = [];
        const paintingId = data.objectIDs.slice(0, 199);

        for (let i = 0; i < paintingId.length; i++) {
          const paintData = await getPaintingData(paintingId[i]);
          paintCollection.push(paintData);
        }

        return paintCollection;
      });
  };

  const getPaintingData = async (id) => {
    return fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    )
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  };

  useEffect(() => {
    const getpainting = async () => {
      try {
        const paintingData = await getPainting();
        const resultData = paintingData
          .filter((item, index) => {
            return (
              index ===
              data.findIndex((obj) => {
                return item.objectID === obj.objectID;
              })
            );
          })
          .slice(0, 16);
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
          {data.map((item) => {
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
