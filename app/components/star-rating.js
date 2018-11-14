import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    // тэг-обертка по дефолту: <div>
    // используемые классы
    classNames: ['rating-panel'],

    // рейтинг
    rating: 0,
    // максимальное значение рейтинга
    maxRating: 5,
    // вычисляемое свойство: зависит от rating и maxRating
    stars: computed('rating', 'maxRating', function() {
        let stars = [];
        // для каждой звезды определяем, полная ли она
        for (let i = 1; i <= this.maxRating; i++) {
            stars.push({
                rating: i,
                isFull: this.rating >= i
            });
        }
        return stars;
    })
});
