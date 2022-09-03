import React from "react";

function ImagePopup({card, onClose}) {
  const className = `popup popup_fullview ${card.name && 'popup_opened'}`;
  const {name, link} = card;

  return (
    <div className={className}>
      <div className="popupfullview">
        <figure className="popupfullview__image">
          <img className="popupfullview__picture" src={link} alt={name}/>
          <figcaption className="popupfullview__caption">{name}</figcaption>
        </figure>
        <button className="button-close" type="button" aria-label="кнопка закрытия формы" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup
