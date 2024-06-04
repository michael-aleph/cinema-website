import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import axios from 'axios';
import "./slick.css";
import "./slick-theme.css";
import './slick-items.css';




export const SimpleSlider = () => {

  const [movies, setMovies] = useState([]);
  const [showInfoBlocks] = useState(true);

  const InfoBlock = ({ title, genre, country, year, rating, imdbLink }) => {
    return (
      <div className="info-block">
        <h2>{title}</h2>
        <p>{genre}, {country}, {year}</p>
        <p>Рейтинг: {rating}/10 (IMDb)</p>
        <a href={imdbLink} target="_blank">Детальніше</a>
      </div>
    );
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the movies!", error);
      });
  }, []);


  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
    ]
  };



  return (
    <Slider {...settings}>
      {movies.map((movie) => (
        <div className="photo-div" key={movie.id}>
          <Link to={`/films/${movie.id}`}>
            <img
              className={movie.className}
              src={movie.imageSrc}
              alt={movie.imageAlt}
            />
            </Link>
          {showInfoBlocks && <InfoBlock {...movie} />}
        </div>
      ))}
    </Slider>
  );
}