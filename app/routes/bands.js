import Route from '@ember/routing/route';
// import wait from 'rarwe/utils/wait';

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

    // async model() {
    //     // искусственная задержка для симуляции долгой загрузки
    //     await wait(3000);
    //     return this.store.findAll('band');
    // },
    
    actions: {
        // экшен, который срабатывает когда переход закончен
        didTransition() {
            document.title = 'Bands - Rock & Roll';
        }
    }
});
