import Controller from '@ember/controller';
import { computed } from '@ember/object';
import extractServerError from 'rarwe/utils/extract-server-error';

export default Controller.extend({
  // вычисляемое свойство для откладывания показа ошибок валидации
  showErrors: computed('_showErrors', {
    get() {
      return this._showErrors || { email: false, password: false };
    },
    set(key, value) {
      this.set('_showErrors', value);
      return this._showErrors;
    }
  }),
  actions: {
    // зарегистрироваться
    async signUp(e) {
      e.preventDefault();

      // Обработка ошибок серверной валидации
      try {
        await this.model.save();
        // переходим на страницу логина
        await this.transitionToRoute('login');
      } catch(response) {
        let errorMessage = extractServerError(response.errors);
        this.baseErrors.pushObject(errorMessage);
      }

      // let { email, password } = this;
      // // создаем новую запись в сторе...
      // let user = this.store.createRecord('user', { email, password });
      // // ...и сохраняем ее, отправляя запрос на сервер
      // await user.save();
    }
  }
});
