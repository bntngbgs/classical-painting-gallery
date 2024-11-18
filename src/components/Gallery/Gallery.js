import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './Gallery.scss';

const Gallery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPainting = () => {
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
        const paintingId = data.objectIDs.slice(0, 199);

        const paintData = await getPaintingData(paintingId);

        return paintData;
      });
  };

  const getPaintingData = (id) => {
    const paintID = id.map((item) => {
      return fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${item}`
      ).then((res) => res.json());
    });

    return Promise.all(paintID).then((results) => {
      return results;
    });
  };

  useEffect(() => {
    const getpainting = async () => {
      try {
        const paintingData = await getPainting();
        const resultData = paintingData.filter((item, index) => {
          return (
            index ===
            paintingData.findIndex((obj) => {
              return item.objectID === obj.objectID;
            })
          );
        });

        resultData
          .map((item) => {
            if (
              item.artistDisplayName !== '' &&
              item.primaryImage &&
              item.title !== '' &&
              item.classification === 'Paintings'
            ) {
              setData((data) => [...data, item]);
              setLoading(false);
            }
          })
          .slice(0, 16);
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
