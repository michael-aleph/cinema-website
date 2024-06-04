import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';

const ArmchairIcon = () => (
  <img src="/img/armchair.svg" alt="Armchair Icon" style={{ width: '28px', height: '28px' }} />
);

const isValidName = (name) => /^[a-zA-Zа-яА-ЯіІєЄїЇ]+$/.test(name);

const isValidPhone = (phone) => /^\d{10}$/.test(phone);

const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const TICKET_PRICE = 200;

const BookingPage = () => {
  const { filmId, sessionTime, title, age } = useParams(); // Extract parameters from the route
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if the modal is open
  const [name, setName] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sessions, setSessions] = useState([]);
  
  useEffect(() => {
    // Fetch sessions data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sessions?movie_id=${filmId}`);
        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions data:", error);
      }
    };
    fetchData();
  }, [filmId]);

  const handleSeatClick = (seatNumber) => {
    const isSeatAvailable = session && session.seats[seatNumber];
  
    if (isSeatAvailable) {
      const newSelectedSeats = [...selectedSeats];
      if (newSelectedSeats.includes(seatNumber)) {
        const index = newSelectedSeats.indexOf(seatNumber);
        newSelectedSeats.splice(index, 1);
      } else {
        newSelectedSeats.push(seatNumber);
      }
      setSelectedSeats(newSelectedSeats);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setErrors({});
    setTouched({});
  };

  const validateFields = () => {
    const newErrors = {};
    if (!isValidName(name)) {
      newErrors.name = "Ім'я може містити тільки букви латиниці або кирилиці.";
    }
    if (!isValidPhone(phone)) {
      newErrors.phone = "Номер телефону має містити 10 цифр.";
    }
    if (!isValidEmail(email)) {
      newErrors.email = "Вказаного email не існує.";
    }
    return newErrors;
  };

  const handleConfirm = async () => {
    const newErrors = validateFields();

    if (Object.keys(newErrors).length === 0) {
      if (session) {
        try {
          console.log("Updating seats in the API...");

          // Update the seats to be marked as occupied in the API
          const updatedSeats = session.seats.map((seat, index) =>
            selectedSeats.includes(index) ? false : seat
          );

          const response = await axios.put(`http://localhost:5000/api/sessions/${session.id}`, {
            seats: updatedSeats,
          });

          if (response.status === 200) {
            console.log("Seats updated successfully.");
            alert(`Ваші місця заброньовані на ім'я ${name} з телефоном ${phone}${email ? ` і електронною поштою ${email}` : ''}`);
            setIsModalOpen(false);
            setSessions((prevSessions) =>
              prevSessions.map((s) =>
                s.id === session.id ? { ...s, seats: updatedSeats } : s
              )
            );
          } else {
            console.error("Failed to update seat data:", response);
          }
        } catch (error) {
          console.error("Error updating seat data:", error);
        }
      } else {
        console.error("Session not found.");
      }
    } else {
      setErrors(newErrors);
      console.log("Validation errors found:", newErrors);
    }
  };

  const handleBlur = (field) => () => {
    const newErrors = validateFields();
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  const handleChange = (field, validator) => (e) => {
    const value = e.target.value;
    let newErrors = { ...errors };

    // Clear error when the user starts typing
    delete newErrors[field];

    setErrors(newErrors);

    // Update the corresponding state
    if (field === 'name') setName(value);
    if (field === 'phone') setPhone(value);
    if (field === 'email') setEmail(value);
  };

  const totalCost = selectedSeats.length * TICKET_PRICE;

  const session = sessions.find(session => session.time === sessionTime);

  // Split into 5 rows
  const seatsInRows = [];
  if (session) {
    const seats = session.seats;
    const numRows = Math.ceil(seats.length / 12);
    for (let i = 0; i < numRows; i++) {
      seatsInRows.push(seats.slice(i * 12, (i + 1) * 12));
    }
  }

  // Render and show seats
  const renderSeatRow = (row, rowIndex) => {
    return (
      <div key={rowIndex} className="seat-row">
        {row.map((isAvailable, index) => (
          <button
            key={index}
            className={`seat ${isAvailable ? 'available' : 'occupied'} ${selectedSeats.includes(index + rowIndex * 12) ? 'selected' : ''}`}
            onClick={() => handleSeatClick(index + rowIndex * 12)}
            data-seat-number={index + rowIndex * 12 + 1}
          >
            <ArmchairIcon />
          </button>
        ))}
      </div>
    );
  };

  // Відображення місць у ряді
  const seatLayout = seatsInRows.map((row, index) => renderSeatRow(row, index));

  // Check if all fields are valid
  const isFormValid = !Object.keys(validateFields()).length;

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
        <p>Вибрані місця: <b>{selectedSeats.map(seatNumber => seatNumber + 1).join(', ')}</b> на сумму <b>{totalCost}</b> грн</p>
      )}</div>
      <div className="button-container">
        <button className="book-button" onClick={handleOpenModal} disabled={selectedSeats.length === 0}>
          Забронювати
        </button>
      </div>

      {/* Modal for booking information */}
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} className="react-modal-content" overlayClassName="react-modal-overlay">
        <h2 className="modal-text-info">Підтвердити бронювання</h2>
        <div className="input">
          <label className="input__label">
            Ім'я: <br></br> 
            <input type="text" className="input__field" value={name} onChange={handleChange('name', isValidName)} onBlur={handleBlur('name')} required />
          </label>
          {touched.name && errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="input">
          <label className="input__label">
            Номер телефону: <br></br> 
            <input type="text" className="input__field" value={phone} onChange={handleChange('phone', isValidPhone)} onBlur={handleBlur('phone')} required />
          </label>
          {touched.phone && errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>
        <div className="input">
          <label className="input__label">
            Електронна пошта: <br></br> 
            <input type="text" className="input__field" value={email} onChange={handleChange('email', isValidEmail)} onBlur={handleBlur('email')} required />
          </label>
          {touched.email && errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <button className="button-group" onClick={handleConfirm} disabled={!isFormValid}>
          Підтвердити
        </button>
      </Modal>
    </div>
  );
};

export default BookingPage;
