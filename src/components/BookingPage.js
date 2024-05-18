import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';

const ArmchairIcon = () => (
  <img src="/img/armchair.svg" alt="Armchair Icon" style={{ width: '28px', height: '28px' }} />
);

const isValidName = (name) => /^[a-zA-Zа-яА-ЯіІєЄїЇ]+$/.test(name);

const isValidPhone = (phone) => /^\d{10}$/.test(phone);

const isValidEmail = (email) => email.includes("@");

const TICKET_PRICE = 200;

const BookingPage = () => {
  const { filmId, sessionTime, title, age } = useParams(); // Extract parameters from the route
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if the modal is open
  const [name, setName] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [errors, setErrors] = useState({});


  const handleSeatClick = (seatNumber) => {
    const newSelectedSeats = [...selectedSeats];
    if (newSelectedSeats.includes(seatNumber)) {
      const index = newSelectedSeats.indexOf(seatNumber);
      newSelectedSeats.splice(index, 1);
    } else {
      newSelectedSeats.push(seatNumber);
    }
    setSelectedSeats(newSelectedSeats);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setErrors({}); 
  };

  const handleConfirm = () => {
    const newErrors = {};
    if (!isValidName(name)) {
      newErrors.name = "Ім'я може містити тільки букви латинниці або кирилиці.";
    }
    if (!isValidPhone(phone)) {
      newErrors.phone = "Номер телефону має містити 10 цифр.";
    }
    if (email && !isValidEmail(email)) {
      newErrors.email = "Емейл має містити знак '@'.";
    }

    if (Object.keys(newErrors).length === 0) {
      alert(`Ваші місця заброньовані на ім'я ${name} з телефоном ${phone}${email ? ` і емейлом ${email}` : ''}`);
      setIsModalOpen(false);
    } else {
      setErrors(newErrors);
    }
  };

  const totalCost = selectedSeats.length * TICKET_PRICE;

  const seatLayout = Array.from({ length: 5 }, (_, rowIndex) => (
    <div key={rowIndex} className="seat-row">
      {Array.from({ length: 12 }, (_, seatIndex) => {
        const seatNumber = rowIndex * 12 + seatIndex + 1;
        return (
          <button
            key={seatNumber}
            className={`seat ${selectedSeats.includes(seatNumber) ? 'selected' : ''}`}
            onClick={() => handleSeatClick(seatNumber)}
          >
            <ArmchairIcon />
          </button>
        );
      })}
    </div>
  ));

  return (
    <div className="booking-page">
      <div className="film-info-small centered">
      <h1 className="film-title-small">Бронювання на фільм "{title}" ({age})</h1> 
      <h2 className="film-session-small">Сеанс: {sessionTime}</h2>
      </div>
      <div className="curved-line"></div>
      <div className="name-curved-line">
        <p>ЕКРАН</p>
      </div>
      <div className="seat-selection">{seatLayout}</div>
      <div className="chosen-place-container">{selectedSeats.length > 0 && (
        <p>Вибрані місця: <b>{selectedSeats.join(', ')}</b> на сумму <b>{totalCost}</b> грн</p>
      )}</div>
      <div className="button-container">
        <button className="book-button" onClick={handleOpenModal} disabled={selectedSeats.length === 0}>
        Забронювати
        </button>
      </div>

      {/* Modal for booking information */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="react-modal-content" overlayClassName="react-modal-overlay">
        <h2>Інформація про бронювання</h2>
        <div className="input">
          <label className="input__label">
            Ім'я (кирилицею або латиницею): <br></br> 
            <input type="text" className="input__field" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
        </div>
        <div className="input">
          <label className="input__label">
            Номер телефону (має містити 10 цифр): <br></br> 
            <input type="text" className="input__field" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>
        </div>
        <div className="input">
          <label className="input__label">
            Емейл: <br></br> 
            <input type="text" className="input__field" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </label>
        </div>
        <button className="button-group" onClick={handleConfirm}>
          Підтвердити
        </button>
      </Modal>
    </div>
  );
};

export default BookingPage;
