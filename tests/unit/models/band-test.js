import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import { A } from '@ember/array';

module('Unit | Model | Band', function(hooks) {
    setupTest(hooks);

    test('#isGreatBand', function(assert) {
      let store = this.owner.lookup('service:store');
      
      let greenDay = run(() => {
        let songs = [
          store.createRecord('song', {
            title: 'American Idiot',
            rating: 5
          }),
          store.createRecord('song', {
            title: 'Holiday',
            rating: 4
          }),
          store.createRecord('song', {
            title: 'Minority',
            rating: 5
          })
        ];
        return store.createRecord('band', { songs: A(songs) });
      });

      assert.ok(greenDay.get('isGreatBand'), 'A band with 2 or more good songs is a great band');

      let limpBizkit = run(() => {
        let songs = [
          store.createRecord('song', {
            title: 'Behind Blue Eyes',
            rating: 2
          }),
          store.createRecord('song', {
            title: 'Rollin\'',
            rating: 3
          }),
          store.createRecord('song', {
            title: 'My Way',
            rating: 2
          })
        ];
        return store.createRecord('band', { songs: A(songs) });
      });

      assert.notOk(limpBizkit.get('isGreatBand'), 'A band with less than 2 good songs is not a great band');
    });
});