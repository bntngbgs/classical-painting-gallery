import Card from '../Card/Card';
import React, { useState } from 'react';
import './Search.scss';
import searchLogo from '../../assets/search-icon.svg';

const Search = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setData([]);
    setLoading(true);
    setError(null);

    try {
      const data = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&q=${search}`
      );

      if (!data.ok) {
        throw new Error('Error: error fetching data');
      }

      const result = await data.json();

      if (result.total === 0) {
        throw new Error("Error: can't find appropriate paintings");
      } else {
        if (result.objectIDs.length > 150) {
          result.objectIDs = result.objectIDs.slice(0, 75);
        }

        let paintingData = await getSearchData(result.objectIDs);

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
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getSearchData = (id) => {
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

  return (
    <div className="search">
      <h1>Search</h1>
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="search-input">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="e.g. Starry Night, Michaelangelo, Landscape etc..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button type="submit">
            <img src={searchLogo} alt="search-icon" />
          </button>
        </div>
      </form>
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
                wikiLink={item.objectURL}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Search;
