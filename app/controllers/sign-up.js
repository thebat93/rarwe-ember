import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
      // зарегистрироваться
      async signUp(e) {
        e.preventDefault();

        let { email, password } = this;
        // создаем новую запись в сторе...
        let user = this.store.createRecord('user', { email, password });
        // ...и сохраняем ее, отправляя запрос на сервер
        await user.save();
        // переходим на страницу логина
        await this.transitionToRoute('login');
      }
    }
});
