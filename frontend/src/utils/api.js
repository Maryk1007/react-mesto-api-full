class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

    _getHeaders() {
      return {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        ...this._headers,
      };
    }

    getProfile() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._getHeaders(),
      })
      .then(this._checkResponse)
    }

    getCardItems() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._getHeaders(),
      })
      .then(this._checkResponse)
    }

    editProfile(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._getHeaders(),
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
        headers: this._getHeaders(),
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
        headers: this._getHeaders(),
      })
      .then(this._checkResponse)
    }

    addLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._getHeaders(),
      })
      .then(this._checkResponse)
    }

    deleteLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._getHeaders(),
      })
      .then(this._checkResponse)
    }

    editAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._getHeaders(),
        body: JSON.stringify({
          avatar
        })
      })
      .then(this._checkResponse)
    }
  }

  export const api = new Api({
    baseUrl: 'api.mesto.maryk.nomoredomains.sbs.nomoredomains.sbs',
    headers: {
      'Content-Type': 'application/json'
    }
  });
