import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const FilmDetails = () => {
  const [films, setFilms] = useState(null);
  const { id } = useParams(); // Отримуємо ID фільму з параметрів маршруту

  const [showSessions, setShowSessions] = useState(false); // Стан для видимості сеансів
  const [sessions, setSessions] = useState([]); // Стан для збереження сеансів
  const modalRef = useRef(null); // Ref для контейнера модального вікна

  useEffect(() => {
    // Отримуємо деталі фільмів з сервера
    axios.get('http://localhost:5000/api/movies')
      .then(response => {
        console.log("Fetched films:", response.data);
        setFilms(response.data); // Зберігаємо отримані дані фільмів
      })
      .catch(error => {
        console.error("There was an error fetching the film details!", error);
      });
  }, []);

  useEffect(() => {
    console.log("Films state:", films); // Виводимо стан films для відладки
    console.log("Route parameter id:", id); // Виводимо параметр id для відладки
  }, [films, id]);

  const selectedFilm = films ? films.find((movie) => movie.id === parseInt(id)) : null; // Знаходимо фільм за ID

  useEffect(() => {
    console.log("Selected film:", selectedFilm);
    if (showSessions && selectedFilm) {
      console.log(`CHOSEN movie_id: ${selectedFilm.id}`);
      axios.get(`http://localhost:5000/api/sessions`, {
        params: { movie_id: selectedFilm.id }
      })
      .then(response => {
        console.log("Sessions for CHOSEN movie_id:", response.data);
        const filteredSessions = response.data;
        setSessions(filteredSessions); // Зберігаємо отримані дані сеансів
      })
      .catch(error => {
        console.error("There was an error fetching the sessions!", error);
      });
    }
  }, [showSessions, selectedFilm]);
  

  const toggleSessions = () => {
    setShowSessions(!showSessions); // Змінюємо видимість сеансів
  };

  if (!films) {
    return <div>Loading...</div>; // Показуємо повідомлення про завантаження, якщо дані фільмів ще не завантажилися
  }

  if (!selectedFilm) {
    return <div>Фільм не знайдено</div>; // Показуємо повідомлення, якщо фільм не знайдено
  }

  return (
    <div className="film-details">
      <div className="film-details__poster">
        <img src={selectedFilm.imageSrc} alt={selectedFilm.imageAlt} className={selectedFilm.className} />
      </div>
      <div className="film-details__info">
        <h2 className="film-details__title">{selectedFilm.title}</h2>
        <div className="film-details__meta">
          <span className="film-details__genre"><b>Жанр:</b> {selectedFilm.genre}</span>
          <span className="film-details__year"> ({selectedFilm.year})</span>
        </div>
        <div className="film-details__actors"><b>Актори: </b>{selectedFilm.actors.join(', ')}</div>
        <div className="film-details__description">
          <p><b>Опис та сюжет: </b>{selectedFilm.description}</p>
        </div>
        <div className="film-details__additional">
          <div className="film-details__age"><b>Вікова категорія: </b>{selectedFilm.age}</div>
          <div className="film-details__duration"><b>Тривалість: </b>{selectedFilm.duration}</div>
          <div className="film-details__language"><b>Мова: </b>{selectedFilm.language}</div>
          <button className="film-details__button" onClick={toggleSessions}>Сеанси</button>
        </div>
      </div>

      {showSessions && (
        <div className="film-details__sessions" ref={modalRef}>
          <h3>Виберіть сеанс:</h3>
          <ul>
            {sessions.map((session) => (
              <li key={session.id}>
                <Link to={`/booking/${selectedFilm.id}/${session.time}/${selectedFilm.title}/${selectedFilm.age}`} className="film-details__session-button">
                  {session.time}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilmDetails;
