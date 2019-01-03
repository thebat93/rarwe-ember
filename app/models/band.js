import DS from 'ember-data';
import { computed } from '@ember/object';
import { buildValidations, validator } from 'ember-cp-validations';
// import { dasherize } from '@ember/string'

const { Model, attr, hasMany } = DS;

const Validations = buildValidations({
    description: [
        validator('length', {
            min: 12,
            message: 'The description needs to be at least 12 characters long'
        }),
        validator('year-of-formation')
    ]
});

export default Model.extend(Validations, {
    // name: '',
    // description: '',

    // init() {
    //     this._super(...arguments);
    //     if (!this.songs) {
    //         this.set('songs', []);
    //     }
    // },

    // аттрибуты модели
    name: attr('string'),

    description: attr('string'),

    isGreatBand: computed('songs.@each.rating', function() {
        let goodSongs = this.songs.filter((song) => song.rating >= 4);
        return goodSongs.length >= 2;
    }),

    // определение свзяей
    // можно не указывать тип, тогда булет использоваться название ключа
    songs: hasMany(/*'song'*/),

    // slug: computed('name', function() {
    //     return dasherize(this.name);
    // })
});