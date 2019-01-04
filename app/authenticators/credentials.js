import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';
import ENV from 'rarwe/config/environment';

export default Base.extend({
  ajax: service(),

  // метод восстановления сессии
  async restore(data) {
    return data;
  },

  // метод аутентификации
  async authenticate(username, password) {
    // POST-запрос: прописываем хедеры и отправляем данные
    let tokenURL = ENV.apiHost ? `${ENV.apiHost}/token` : '/token';
    let response = await this.ajax.post(tokenURL, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      },
      data: JSON.stringify({
        username,
        password
      })
    });

    let { user_email: userEmail, token } = response;

    return { userEmail, token };
  },

  // invalidate(data) {
  // }
});
