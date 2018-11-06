import Route from '@ember/routing/route';
import EmberObject, { computed } from '@ember/object';
import { dasherize } from '@ember/string'
import { A } from '@ember/array';

let Band = EmberObject.extend({
    name: '',
    language: '',
    slug: computed('name', function() {
        return dasherize(this.name);
    }),
    site: computed('slug', 'language', function() {
        return `https://bands.com/${this.slug}.${this.language}`;
    })
});

let Song = EmberObject.extend({
    title: '',
    band: '',
    rating: 0
});

export default Route.extend({
    model() {
        let blackDog = Song.create({
            title: 'Black Dog',
            band: 'Led Zeppelin',
            rating: 3
        });

        let yellowLedbetter = Song.create({
            title: 'Yellow Ledbetter',
            band: 'Pearl Jam',
            rating: 4
        });

        let daughter = Song.create({
            title: 'Daughter',
            band: 'Pearl Jam',
            rating: 5
        });

        let pretender = Song.create({
            title: 'The Pretender',
            band: 'Foo Fighters',
            rating: 2
        });

        let ledZeppelin = Band.create({
            name: 'Led Zeppelin',
            songs: A([blackDog])
        });

        let pearlJam = Band.create({
            name: 'Pearl Jam',
            songs: A([yellowLedbetter, daughter])
        });

        let fooFighters = Band.create({
            name: 'Foo Fighters',
            songs: A([pretender])
        });

        return A([ledZeppelin, pearlJam, fooFighters]);
    }
});
