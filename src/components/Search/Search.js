import React, { useState } from 'react';
import './Search.scss';
import searchLogo from '../../assets/search-icon.svg';

const Search = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error fetching data');
        }
        return res.json();
      })
      .then((data) => {
        const MAX_LENGTH = 16;
        if (data.total === 0) {
          throw new Error("Can't find appropriate paintings");
        } else {
          if (data.total < MAX_LENGTH) {
            getSearchData(data.objectIDs);
          } else {
            data.objectIDs.slice(0, MAX_LENGTH);
            getSearchData(data.objectIDs);
          }
        }
      });
  };

  const getSearchData = (id) => {
    const paintID = id.map((item) => {
      return fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${item}`
      ).then((res) => res.json());
    });

    return Promise.all(paintID).then((results) => {
      return setData(results);
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
      <p>{data.map((item) => item.title)}</p>
      {data.map((item) => {
        return <img src={item.primaryImage} />;
      })}
    </div>
  );
};

export default Search;
