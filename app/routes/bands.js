import Route from '@ember/routing/route';

export default Route.extend({
    model() {
    // let pearlJam = Band.create({
    //     name: 'Pearl Jam',
    //     description: 'Pearl Jam is an American rock band, formed in Seattle, Washington in 1990.',
    //     songs: A([yellowLedbetter, daughter])
    // });

    // return A([ledZeppelin, pearlJam, fooFighters]);
        return this.store.findAll('band');
    },
    
    actions: {
        // экшен, который срабатывает когда переход закончен
        didTransition() {
            document.title = 'Bands - Rock & Roll';
        }
    }
});
