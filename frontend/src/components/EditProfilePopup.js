import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isContentSubmitButton, setContentSubmitButton] =
    React.useState("Сохранить");

  const [formValues, setFormValues] = React.useState({
    name: "",
    description: "",
  });
  const { name, description } = formValues;

  const handleFormValues = React.useCallback(
    (evt) => {
      const { name, value } = evt.target;
      setFormValues((prevState) => ({ ...prevState, [name]: value }));
    },
    [setFormValues]
  );

  React.useEffect(() => {
    setFormValues({
      name: currentUser.name,
      description: currentUser.about,
    });
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    renderLoading(true);
    onUpdateUser({
      name,
      about: description,
      onRenderLoading: () => {
        renderLoading(false);
      },
    });
  }

  function renderLoading(isLoading) {
    isLoading
      ? setContentSubmitButton("Сохранение...")
      : setContentSubmitButton("Сохранить");
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="form__field">
        <input
          className="form__input form__input_field_name"
          value={name || ""}
          onChange={handleFormValues}
          type="text"
          id="userName"
          name="name"
          required
          minLength="2"
          maxLength="40"
          placeholder="Напишите ваше имя"
        />
        <span className="form__field-error" id="error-userName"></span>
      </div>
      <div className="form__field">
        <input
          className="form__input form__input_field_description"
          value={description || ""}
          onChange={handleFormValues}
          type="text"
          id="userJob"
          name="description"
          required
          minLength="2"
          maxLength="200"
          placeholder="Напишите чем вы занимаетесь"
        />
        <span className="form__field-error" id="error-userJob"></span>
      </div>
      <button className="button-save" type="submit">
        {isContentSubmitButton}
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
