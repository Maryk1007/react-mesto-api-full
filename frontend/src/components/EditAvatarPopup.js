import { useRef, useState, useCallback, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const imageRef = useRef();
  const [isContentSubmitButton, setContentSubmitButton] = useState('Сохранить');
  const [setFormValues] = useState('');

  const handleFormValues = useCallback((evt)=>{
    const { name, value } = evt.target
    setFormValues(prevState=>({...prevState, [name]: value}))
  }, [setFormValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    renderLoading(true);
    onUpdateAvatar(
      {avatar: imageRef.current.value,
      onRenderLoading: ()=>{
        renderLoading(false)
      }
    })
  }

  useEffect(() => {
    imageRef.current.value = ''
  },[setFormValues, isOpen])

  function renderLoading(isLoading){
    isLoading ? setContentSubmitButton('Сохранение...') : setContentSubmitButton('Сохранить')
  }

  return(
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <div className="form__field">
        <input
          ref={imageRef}
          onChange={handleFormValues}
          className="form__input form__input_field_link-avatar"
          type="url"
          id="avatar"
          name="avatar"
          required
          placeholder="Ссылка на ваше новое фото"/>
        <span className="form__field-error" id="error-avatar"></span>
      </div>
      <button className="button-save" type="submit">{isContentSubmitButton}</button>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
