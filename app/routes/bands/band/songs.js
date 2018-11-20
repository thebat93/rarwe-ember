import Route from '@ember/routing/route';

export default Route.extend({
    // хук, который вызывается когда происходит выход из роута или меняется модель
    resetController(controller/*, isExiting, transition*/) {
        controller.setProperties({
            isAddingSong: false,
            newSongName: ''
        });
    },
    model() {
        return this.modelFor('bands.band')
    }
});
