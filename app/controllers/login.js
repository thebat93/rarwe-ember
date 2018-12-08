import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  actions: {
    async signIn(e) {
      e.preventDefault();
      let { email, password } = this;

      //TODO: authenticate the user against the backend
      await this.transitionToRoute('bands');
    }
  }
});
