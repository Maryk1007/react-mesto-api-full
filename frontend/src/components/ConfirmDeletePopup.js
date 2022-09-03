import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function ConfirmDeletePopup({isOpen, onClose, onCardDelete}) {
  const [isContentSubmitButton, setContentSubmitButton] = React.useState('Да')

  function handleSubmit(evt) {
    evt.preventDefault();
    renderLoading(true);
    onCardDelete(
      {
      onRenderLoading: ()=>{
        renderLoading(false)
      }
    })
  }

  function renderLoading(isLoading){
    isLoading ? setContentSubmitButton('Удаление...') : setContentSubmitButton('Да')
  }

  return (
    <PopupWithForm
      name="confirm-delete"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <button className="button-save" type="submit">{isContentSubmitButton}</button>
    </PopupWithForm>
  )
}

export default ConfirmDeletePopup;
