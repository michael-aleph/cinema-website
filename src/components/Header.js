import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
      <div className="header__logo-and-nav">
        <div className="header__logo">
          <a href="/">
            <img
              src="https://i.ibb.co/pvrNt3c/blaze-cinema-logo.png"
              alt="Blaze Logo"
              className="header__logo-img"
            />
          </a>
        </div>
        </div>
        <div className="header__info">
          <div className="header__location">
            <p>Київ, Lake Plaza</p>
          </div>
          <div className="header__icons">
            <a href="https://maps.app.goo.gl/t76S6zJ5aABoN9dx6" target="_blank" className="no-underline">
              <img src="/img/geo-icon.png" alt="geo icon" className="header__geo-icon" />
            </a>
              <a href="https://www.instagram.com/blaze.lake.plaza" target="_blank" className="no-underline">
                <img src="/img/insta-icon.png" alt="insta icon" className="header__insta-icon" />
              </a>
              <a href="mailto:blaze.info@gmail.com" className="no-underline">
                <img src="/img/mail-icon.png" alt="mail icon" className="header__mail-icon" />
              </a>
              <a href="tel:+380664050150" className="no-underline">
                <img src="/img/phone-icon.png" alt="phone icon" className="header__phone-icon" />
              </a>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
