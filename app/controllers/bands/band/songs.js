import Controller from '@ember/controller';
import { empty, sort } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Controller.extend({
  isAddingSong: false,
  newSongName: '',
  isAddButtonDisabled: empty('newSongName'),
  // сортировать по...
  sortBy: 'ratingDesc',

  // настройки для сортировки
  sortProperties: computed('sortBy', function() {
    let options = {
      ratingDesc: ['rating:desc', 'title:asc'],
      ratingAsc : ['rating:asc', 'title:asc'],
      titleDesc : ['title:desc'],
      titleAsc  : ['title:asc']
    };
    return options[this.sortBy];
  }),

  // вычисляемое свойство: отсортированные песни
  sortedSongs: sort('matchingSongs', 'sortProperties'),

  // значение, введенное в строку поиска
  searchTerm: '',

  // песни, которые подошли под поисковый запрос
  matchingSongs: computed('model.songs.@each.title', 'searchTerm', function() {
    let searchTerm = this.searchTerm.toLowerCase();
    return this.model.get('songs').filter((song) => {
      return song.title.toLowerCase().includes(searchTerm);
    });
  }),

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
        band: this.get('model')
      });
      // POST-запрос
      await newSong.save();
      // обнуляем название новой песни
      this.set('newSongName', '');
    },

    // обновить рейтинг
    updateRating(song, rating) {
      // обновляем свойство модели
      song.set('rating', song.rating === rating ? 0 : rating);

      // PATCH-запрос на обновление рейтинга
      return song.save();
    }
  }
});
