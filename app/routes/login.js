import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

// миксин для незащищенного роута: редирект если пользователь авторизован
export default Route.extend(UnauthenticatedRouteMixin, {
});
