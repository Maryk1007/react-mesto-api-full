import React from "react";
import imageSuccess from "../images/success-image.svg";
import imageFail from "../images/fail-image.svg";


function InfoTooltip({isOpen, onClose, successResult, successMessage, failMessage}) {
  return(
    <div className={`popup popup_infotooltip ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <figure className="popup__response">
          <img className="popup__response-image" src={successResult ? imageSuccess : imageFail} alt="результат ответа сервера"/>
          <figcaption className="popup__response-text">{successResult ? successMessage : failMessage}</figcaption>
        </figure>
        <button className="button-close" type="button" aria-label="кнопка закрытия формы" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;
