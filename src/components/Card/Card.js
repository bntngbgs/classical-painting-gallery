import React from 'react';
import './Card.scss';

const Card = ({ imgUrl, title, artist, year }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={imgUrl} alt="painting" />
      </div>
      <div className="card-description">
        <h2>{title}</h2>
        <p>{artist}</p>
        <p>{year}</p>
      </div>
    </div>
  );
};

export default Card;
