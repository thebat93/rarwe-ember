import Controller from '@ember/controller';
// import Song from 'rarwe/models/song';
import { empty } from '@ember/object/computed';

export default Controller.extend({
    isAddingSong: false,
    newSongName: '',
    isAddButtonDisabled: empty('newSongName'),

    actions: {
        // добавить новую песню
        addSong() {
            this.set('isAddingSong', true);
        },

        //отменить добавление новой песни
        cancelAddSong() {
            this.set('isAddingSong', false);
        },

        // сохранить новую песню
        async saveSong(e) {
            e.preventDefault();
            // создать новую запись в сторе
            let newSong = this.get('store').createRecord('song', {
                title: this.get('newSongName'),
                // связь с группой
                band: this.model
            });
            // POST-запрос
            await newSong.save();
            // обнуляем название новой песни
            this.set('newSongName', '');
        },

        // обновить рейтинг
        updateRating(song, rating) {
            song.set('rating', song.rating === rating ? 0 : rating);
        }
    }
});
