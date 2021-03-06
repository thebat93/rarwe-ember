import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
    // title: '',
    // band: null,
    // rating: 0

    title: attr('string'),
    rating: attr('number'),
    band: belongsTo()
});
