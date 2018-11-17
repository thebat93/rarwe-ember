import Route from '@ember/routing/route';

export default Route.extend({
    // хук "beforeModel()" выполняется до хука "model()"
    beforeModel() {
        // редирект на другой роут
        this.transitionTo('bands');
    }
});
