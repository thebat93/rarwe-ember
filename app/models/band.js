import DS from 'ember-data';
// import { computed } from '@ember/object';
// import { dasherize } from '@ember/string'

const { Model, attr, hasMany } = DS;

export default Model.extend({
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

    // определение свзяей
    // можно не указывать тип, тогда булет использоваться название ключа
    songs: hasMany(/*'song'*/),

    // slug: computed('name', function() {
    //     return dasherize(this.name);
    // })
});