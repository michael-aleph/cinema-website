import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import './slick-items.css';



export const SimpleSlider = () => {

  const [showInfoBlocks] = useState(true);

  const InfoBlock = ({ title, genre, country, year, rating, imdbLink }) => {
    return (
      <div className="info-block">
        <h2>{title}</h2>
        <p>{genre}, {country}, {year}</p>
        <p>Рейтинг: {rating}/10 (IMDb)</p>
        <a href={imdbLink}>Детальніше</a>
      </div>
    );
  };

  const movies = [
    {
      id: 1,
      title: 'Годзіла та Конг: Нова імперія',
      genre: 'Пригодницький бойовик',
      country: 'США',
      year: 2024,
      rating: 8.2,
      imdbLink: 'https://www.imdb.com/title/tt5034838/',
      imageSrc: 'https://i.ibb.co/WWkVKJ4/image-2024-04-02-124254.png',
      imageAlt: 'Годзіла та Конг: Нова імперія',
      className: 'godzila slick-picture',
    },
    {
      id: 2,
      title: 'Дюна: Частина друга',
      genre: 'Наукова фантастика, Пригоди',
      country: 'США',
      year: 2023,
      rating: 8.7,
      imdbLink: 'https://www.imdb.com/title/tt3778605/',
      imageSrc: 'https://i.ibb.co/cXd0hHF/image-2024-04-02-124610.png',
      imageAlt: 'Дюна: Частина друга',
      className: 'duna slick-picture',
    },
    {
      id: 3,
      title: 'Лишайся онлайн',
      genre: 'Бойовик, Драма, Трилер',
      country: 'США',
      year: 2023,
      rating: 7.5,
      imdbLink: 'https://www.imdb.com/title/tt1097010/',
      imageSrc: 'https://i.ibb.co/DzGKWB7/image-2024-04-02-124350.png',
      imageAlt: 'Лишайся онлайн',
      className: 'be-online slick-picture',
    },
    {
      id: 4,
      title: 'Небезпечна гра',
      genre: 'Трилер, Кримінал',
      country: 'США',
      year: 2022,
      rating: 6.8,
      imdbLink: 'https://www.imdb.com/title/tt1006774/',
      imageSrc: 'https://i.ibb.co/jWYLn2W/image-2024-04-02-124449.png',
      imageAlt: 'Небезпечна гра',
      className: 'dangerous-game slick-picture',
    },
    {
      id: 5,
      title: 'Кілер іде геть',
      genre: 'Комедія, Бойовик',
      country: 'США',
      year: 2022,
      rating: 7.2,
      imdbLink: 'https://www.imdb.com/title/tt1099943/',
      imageSrc: 'https://i.ibb.co/54BNcGm/image-2024-04-02-124520.png',
      imageAlt: 'Кілер іде геть',
      className: 'killer slick-picture',
    },
    {
      id: 6,
      title: 'Панда Кунг-Фу 4',
      genre: 'Анімація, Пригоди, Комедія',
      country: 'США, Китай',
      year: 2021,
      rating: 7.6,
      imdbLink: 'https://www.imdb.com/title/tt4571044/',
      imageSrc: 'https://i.ibb.co/KVfvfR6/panda.webp',
      imageAlt: 'Панда Кунг-Фу 4',
      className: 'panda slick-picture'
    },
    {
      id: 7,
      title: 'Омен: Початок',
      genre: 'Жахи, Містика, Трилер',
      country: 'США',
      year: 2021,
      rating: 6.5,
      imdbLink: 'https://www.imdb.com/title/tt1125019/',
      imageSrc: 'https://i.ibb.co/c8yzytP/omen.webp',
      imageAlt: 'Омен: Початок',
      className: 'omen slick-picture',
    },
    {
      id: 8,
      title: 'Материнський інстинкт',
      genre: 'Трилер, Драма',
      country: 'Велика Британія',
      year: 2020,
      rating: 8.1,
      imdbLink: 'https://www.imdb.com/title/tt7919196/',
      imageSrc: 'https://i.ibb.co/qCddcSH/mother-instinct.webp',
      imageAlt: 'Материнський інстинкт',
      className: 'mother-instinct slick-picture',
    },
  ];


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
        <div className="photo-div" key={movie.title}>
          <img
            className={movie.className}
            src={movie.imageSrc}
            alt={movie.imageAlt}
          />
          {showInfoBlocks && <InfoBlock {...movie} />}
        </div>
      ))}
    </Slider>
  );
}