import React from 'react';

const FilmDetails = ({ film }) => {
  // Destructure film data from props for better readability (optional)
  const { imageSrc, title, description, country, actors } = film;

  return (
    <div className="film-details">
      <img className="film-poster" src={imageSrc} alt={title} />
      <div className="film-info">
        <h2>{title}</h2>
        <p>{description}</p>
        <p><b>Country:</b> {country}</p>
        <p><b>Cast:</b> {actors.join(', ')}</p>
      </div>
    </div>
  );
};

export default FilmDetails;