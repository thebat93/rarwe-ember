import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
// import wait from 'rarwe/utils/wait';

// расширяем от миксина: объявляем роут защищенным
// все дочерние роуты тоже окажутся защищенными
// по умолчанию редиректит на /login если пользователь не аутентифицирован
export default Route.extend(AuthenticatedRouteMixin, {
    model() {
    // let pearlJam = Band.create({
    //     name: 'Pearl Jam',
    //     description: 'Pearl Jam is an American rock band, formed in Seattle, Washington in 1990.',
    //     songs: A([yellowLedbetter, daughter])
    // });

    // return A([ledZeppelin, pearlJam, fooFighters]);
        return this.store.findAll('band');
    },

    // async model() {
    //     // искусственная задержка для симуляции долгой загрузки
    //     await wait(3000);
    //     return this.store.findAll('band');
    // },
    
    actions: {
        // экшен, который срабатывает когда переход закончен
        didTransition() {
            document.title = 'Bands - Rock & Roll';
        }
    }
});
