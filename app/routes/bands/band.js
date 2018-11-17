import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';

export default Route.extend({
    model(params) {
        let bands = this.modelFor('bands');
        return bands.findBy('slug', params.slug);
    },

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
