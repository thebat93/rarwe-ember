import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { buildValidations } from 'ember-cp-validations';
import emailFieldValidation from 'rarwe/validations/email-field';
import passwordFieldValidation from 'rarwe/validations/password-field';
import { computed } from '@ember/object';

const Validations = buildValidations({
  email: emailFieldValidation,
  password: passwordFieldValidation
});

export default Controller.extend(Validations, {
  session: service(),

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
    async signIn(e) {
      e.preventDefault();
      let { email, password } = this;

      //TODO: authenticate the user against the backend
      // используем метод аутентификации
      await this.session.authenticate('authenticator:credentials', email, password);
      await this.transitionToRoute('bands');
    }
  }
});
