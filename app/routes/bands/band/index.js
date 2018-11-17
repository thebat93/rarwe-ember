import Route from '@ember/routing/route';

export default Route.extend({
    // хук редиректа, выполняется после окончания перехода на роут
    redirect(band) {
        // переходим на тот или иной роут в зависимости от наличия описания
        if (band.description) {
            this.transitionTo('bands.band.details');
        } else {
            this.transitionTo('bands.band.songs');
        }
    }
});
