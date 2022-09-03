import React from "react";

function PopupWithForm({name, title, isOpen, onClose, children, onSubmit}) {
  const className = `popup popup_${name} ${isOpen ? 'popup_opened' : ''}`;

  return (
    <div className={className}>
      <div className="popup__container">
        <button className="button-close" type="button" aria-label="кнопка закрытия формы" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form form" name={`${name}-form`} noValidate autoComplete="off" onSubmit={onSubmit}>
        {children}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
