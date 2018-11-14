import Controller from '@ember/controller';
import Band from 'rarwe/models/band';
// хелпер который возвращает true если переданное свойство пустое
import { empty } from '@ember/object/computed';

export default Controller.extend({
    isAddingBand: false,
    newBandName: '',
    isAddButtonDisabled: empty('newBandName'),

    actions: {
        addBand() {
            this.set('isAddingBand', true);
        },

        cancelAddBand() {
            this.set('isAddingBand', false);
        },

        saveBand(e) {
            e.preventDefault();
            let newBand = Band.create({ name: this.newBandName });
            this.model.pushObject(newBand);
            // обнуляем ввод и возвращаем в изначальное состояние
            this.setProperties({
                newBandName: '',
                isAddingBand: false
            });
            // переходим по роуту с band = newBand
            this.transitionToRoute('bands.band.songs', newBand);
        }
    }
});
