import React from 'react';

import './popup.scss';

const Popup = () => {
  return (
    <div className="popup">
      <div className="popup__wrapper">
        <p className="popup__description">
          Бригада будет доставлена на астероид в нужный момент и выполнит свою нелёгкую работу.
        </p>
        <div className="popup__video">
          <iframe
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            src="https://www.youtube.com/embed/OYcTmiCtCv8"
            title="YouTube video player">
          </iframe>
        </div>
        <button className="popup__button" aria-label="Закрыть окно"></button>
      </div>
    </div>
  );
};

export default Popup;
