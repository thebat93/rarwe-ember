import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

// миксин для незащищенного роута: редирект если пользователь авторизован
// по дефолту редирект на /index
export default Route.extend(UnauthenticatedRouteMixin, {
  model() {
    // чтобы провести валидацию полей создаем инстанс при заходе на роут
    return this.store.createRecord('user');
  }
});
