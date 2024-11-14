import React from 'react';
import './Homepage.scss';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="hero">
      <div className="hero-text">
        <h1>Explore Interesting Classical Paintings</h1>
        <p>
          Get to know various classical paintings araund the world. Each piece
          tells a story capturing moments in time with colors and details. This
          connection to history and culture makes viewing classical paintings
          both enriching and enlightening.
        </p>
        <Link to={'/gallery'}>Look at the gallery</Link>
      </div>
    </div>
  );
};

export default Homepage;
