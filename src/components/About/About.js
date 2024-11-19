import React from 'react';
import metLogo from '../../assets/met-museum-logo.jpg';
import './About.scss';

const About = () => {
  return (
    <div className="about">
      <div class="met-desc">
        <h3>
          The information contained in this site is provided from metmuseum.org.
          This site may contain copyrighted material the use of which has not
          always been specifically authorized by the copyright owner.
        </h3>
        <p>
          Museum website :{' '}
          <a href="https://www.metmuseum.org/">metmuseum.org</a>
        </p>
        <p>
          API website :{' '}
          <a href="https://metmuseum.github.io/">metmuseum.github.io</a>
        </p>
      </div>
      <div class="met-logo">
        <img src={metLogo} alt="metmuseum logo" />
      </div>
    </div>
  );
};

export default About;
