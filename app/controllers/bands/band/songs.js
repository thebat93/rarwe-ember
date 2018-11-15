import Controller from '@ember/controller';
import Song from 'rarwe/models/song';
import { empty } from '@ember/object/computed';

export default Controller.extend({
    isAddingSong: false,
    newSongName: '',
    isAddButtonDisabled: empty('newSongName'),

    actions: {
        addSong() {
            this.set('isAddingSong', true);
        },

        cancelAddSong() {
            this.set('isAddingSong', false);
        },

        saveSong(e) {
            e.preventDefault();
            let newSong = Song.create({ title: this.newSongName });
            this.model.songs.pushObject(newSong);
            this.set('newSongName', '');
        },
        // обновить рейтинг
        updateRating(params) {
            let { item: song, rating } = params;
            song.set('rating', rating);
        }
    }
});
