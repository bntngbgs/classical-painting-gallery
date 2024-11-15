import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './Gallery.scss';

const Gallery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=*&hasImages=true`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error fetching data!');
        }
        return res.json();
      })
      .then((data) => {
        return data.objectIDs.slice(0, 199);
      })
      .then((id) => {
        const paintingId = id.map((item) => {
          return fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${item}`
          ).then((res) => res.json());
        });

        return Promise.all(paintingId).then((results) => {
          return results;
        });
      })
      .then((results) => {
        results.map((item) => {
          if (
            item.artistDisplayName !== '' &&
            item.primaryImage &&
            item.title !== '' &&
            item.classification === 'Paintings'
          ) {
            setData((data) => [...data, item]);
            setLoading(false);
          }
          return results;
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, []);

  return (
    <div className="gallery">
      <h1>Gallery</h1>
      {loading && <div className="loader"></div>}
      {error && <p className="error-message">{error.message}</p>}
      {data && (
        <ul>
          {data
            .filter((item, index) => {
              return (
                index ===
                data.findIndex((obj) => {
                  return item.objectID === obj.objectID;
                })
              );
            })
            .slice(0, 16)
            .map((item) => {
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
