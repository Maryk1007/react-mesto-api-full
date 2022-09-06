import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onUpdatePhoto }) {
  const [isContentSubmitButton, setContentSubmitButton] =
    React.useState("Создать");

  const [formValues, setFormValues] = React.useState({
    name: "",
    link: "",
  });
  const { name, link } = formValues;

  const handleFormValues = React.useCallback(
    (evt) => {
      const { name, value } = evt.target;
      setFormValues((prevState) => ({ ...prevState, [name]: value }));
    },
    [setFormValues]
  );

  React.useEffect(() => {
    setFormValues({
      name: "",
      link: "",
    });
  }, [setFormValues, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    renderLoading(true);
    onUpdatePhoto({
      name,
      link,
      onRenderLoading: () => {
        renderLoading(false);
      },
    });
  }

  function renderLoading(isLoading) {
    isLoading
      ? setContentSubmitButton("Сохранение...")
      : setContentSubmitButton("Создать");
  }

  return (
    <PopupWithForm
      name="photo"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="form__field">
        <input
          className="form__input form__input_field_title"
          value={name || ""}
          onChange={handleFormValues}
          type="text"
          id="photoName"
          name="name"
          required
          minLength="2"
          maxLength="30"
          placeholder="Название"
        />
        <span className="form__field-error" id="error-photoName"></span>
      </div>
      <div className="form__field">
        <input
          className="form__input form__input_field_link"
          value={link || ""}
          onChange={handleFormValues}
          type="url"
          id="photoLink"
          name="link"
          required
          placeholder="Ссылка на картинку"
        />
        <span className="form__field-error" id="error-photoLink"></span>
      </div>
      <button className="button-save" type="submit">
        {isContentSubmitButton}
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
