import Card from '../Card/Card';
import React, { useState } from 'react';
import './Search.scss';
import searchLogo from '../../assets/search-icon.svg';

const Search = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setData([]);

    try {
      const data = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`
      );

      if (!data.ok) {
        throw new Error('Error: error fetching data');
      }

      const result = await data.json();

      if (result.total === 0) {
        throw new Error("Error: can't find appropriate paintings");
      } else {
        let paintingData = await getSearchData(result.objectIDs);

        console.log(paintingData);

        paintingData.map((item) => {
          if (
            item.artistDisplayName !== '' &&
            item.primaryImage &&
            item.title !== '' &&
            item.classification === 'Paintings'
          ) {
            setData((data) => [...data, item]);
          }
        });
      }
    } catch (error) {
      setError(error);
    }
  };

  const getSearchData = (id) => {
    const paintID = id.map((item) => {
      return fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${item}`
      ).then((res) => res.json());
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
      {error && <p>{error.message}</p>}
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

export default Search;
