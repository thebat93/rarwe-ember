import Controller from '@ember/controller';
import Band from 'rarwe/models/band';
// хелпер который возвращает true если переданное свойство пустое
import { empty } from '@ember/object/computed';

export default Controller.extend({
    // флаг: режим добавления новой группы
    isAddingBand: false,
    // название добавляемой группы
    newBandName: '',
    // флаг: активность кнопки "Добавить"
    isAddButtonDisabled: empty('newBandName'),

    actions: {
        // добавить новую группу
        addBand() {
            this.set('isAddingBand', true);
        },
        // отменить добавление группы
        cancelAddBand() {
            this.set('isAddingBand', false);
        },
        // сохранить новую группу
        saveBand(e) {
            // запрещаем отправку формы по дефолту
            e.preventDefault();
            // создаем новую группу на основе модели
            let newBand = Band.create({ name: this.newBandName });
            // добавляем новую группу в свойство model
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
