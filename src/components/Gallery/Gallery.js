import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './Gallery.scss';

const Gallery = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  let cardComponent = [];

  useEffect(() => {
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=*&hasImages=true`
    )
      .then((res) => res.json())
      .then((data) => {
        return data.objectIDs.slice(0, 99);
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
          }
        });

        // setData(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="gallery">
      <h1>Gallery</h1>
      <ul>
        {data.slice(0, 16).map((item) => {
          return (
            <Card
              imgUrl={item.primaryImage}
              title={item.title}
              artist={item.artistDisplayName}
              year={item.accessionYear}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Gallery;
