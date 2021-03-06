import Route from '@ember/routing/route';
import { capitalize } from 'rarwe/helpers/capitalize';
// import wait from 'rarwe/utils/wait';

export default Route.extend({
    // хук, который вызывается когда происходит выход из роута или меняется модель
    resetController(controller/*, isExiting, transition*/) {
        controller.setProperties({
            isAddingSong: false,
            newSongName: ''
        });
    },

    model() {
        return this.modelFor('bands.band');
    },

    // async model() {
    //     await wait(3000);
    //     return this.modelFor('bands.band');
    // },

    actions: {
        // экшен, который срабатывает когда переход закончен
        didTransition() {
            let band = this.modelFor('bands.band');
            let name = capitalize(band.name);
            document.title = `${name} - Rock & Roll`;
        }
    }
});
