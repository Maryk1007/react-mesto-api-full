class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);


    getProfile() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
      },
      })
      .then(this._checkResponse)
    }

    getCardItems() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
      },
      })
      .then(this._checkResponse)
    }

    editProfile(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          name,
          about
        })
      })
      .then(this._checkResponse)
    }

    addCards(name, link) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          name,
          link,
        })

      })
      .then(this._checkResponse)
    }

    deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
      },
      })
      .then(this._checkResponse)
    }

    addLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
      },
      })
      .then(this._checkResponse)
    }

    deleteLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
      },
      })
      .then(this._checkResponse)
    }

    editAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          avatar
        })
      })
      .then(this._checkResponse)
    }
  }

  export const api = new Api({
    baseUrl: 'https://api.maryk.mesto.nomoredomains.sbs',
  });
