import { module, test } from 'qunit';
import { visit, click, fillIn, currentURL, find } from '@ember/test-helpers';
import { createBand, createSong, loginAs } from 'rarwe/tests/helpers/custom-helpers'
import { setupApplicationTest } from 'ember-qunit';
import setupMirageTest from 'ember-cli-mirage/test-support/setup-mirage';
import { percySnapshot } from 'ember-percy/snapshot';

module('Acceptance | Bands', function(hooks) {
  setupApplicationTest(hooks);
  setupMirageTest(hooks);

  test('List bands', async function(assert) {
    this.server.create('band', { name: 'Radiohead' });
    this.server.create('band', { name: 'Long Distance Calling' });
    
    await loginAs('dave@tcv.com');

    await visit('/');

    percySnapshot('List of bands');
    
    assert.dom('[data-test-rr=band-link]').exists({ count: 2}, 'All band links are rendered');
    assert.dom('[data-test-rr=band-list-item]:first-child').hasText('Radiohead', 'First band link contains the band name');
    assert.dom('[data-test-rr=band-list-item]:last-child').hasText('Long Distance Calling', 'The other band link contains the band name');
  });

  test('Create a band', async function(assert) {
    this.server.create('band', { name: 'Royal Blood' });
    
    await loginAs('dave@tcv.com');

    await visit('/');
    await createBand('Caspian');
    
    assert.dom('[data-test-rr=band-list-item]').exists({ count: 2 }, 'A new band link is rendered');
    assert.dom('[data-test-rr=band-list-item]:last-child').hasText('Caspian', 'The new band link is rendered as the last item');
    assert.dom('[data-test-rr=songs-nav-item] > .active').hasText('Songs', 'The Songs tab is active');
  });

  test('Create a song', async function(assert) {
    this.server.create('band', { name: 'Green Day' });
    
    await loginAs('dave@tcv.com');

    await visit('/');
    await click('[data-test-rr=band-link]:first-child');

    assert.dom('[data-test-rr=song-list-item]').exists({ count: 0 }, 'No song links are rendered');
    assert.dom('[data-test-rr=songs-nav-item] > .active').hasText('Songs', 'The Songs tab is active');

    await createSong('American Idiot');

    assert.dom('[data-test-rr=song-list-item]').exists({ count: 1 }, 'The new song link is rendered');
    assert.dom('[data-test-rr=song-list-item]:first-child').hasText('American Idiot', 'The new song link is rendered as the first item');
  });

  test('Sort songs in various ways', async function(assert) {
    let band = this.server.create('band', { name: 'Hoobastank' });
    this.server.create('song', { title: 'Same Direction', rating: 5, band });
    this.server.create('song', { title: 'Crawling In The Dark', rating: 4, band });
    this.server.create('song', { title: 'The Letter', rating: 3, band });
    this.server.create('song', { title: 'Out Of Control', rating: 5, band });

    await loginAs('dave@tcv.com');

    await visit('/');
    await click('[data-test-rr=band-link]');

    percySnapshot('Sort songs - Default sorting order');

    assert.equal(currentURL(), '/bands/1/songs');
    assert.dom('[data-test-rr=song-list-item]:first-child').hasText('Out Of Control', 'The first song is the hightest ranked, first one in the alphabet');
    assert.dom('[data-test-rr=song-list-item]:last-of-type').hasText('The Letter', 'The last song is the lowest ranked, last one in the alphabet');

    const titleDescOption = find('[data-test-rr=sort-by-title-desc]').value;
    await fillIn('[data-test-rr=sort-selector]', titleDescOption);

    assert.equal(currentURL(), '/bands/1/songs?sort=titleDesc');
    assert.dom('[data-test-rr=song-list-item]:first-child').hasText('The Letter', 'the first song is the one that comes last in the alphabet');
    assert.dom('[data-test-rr=song-list-item]:last-of-type').hasText('Crawling In The Dark', 'the first song is the one that comes first in the alphabet');

    const titleAscOption = find('[data-test-rr=sort-by-title-asc]').value;
    await fillIn('[data-test-rr=sort-selector]', titleAscOption);

    assert.equal(currentURL(), '/bands/1/songs?sort=titleAsc');

    const ratingAscOption = find('[data-test-rr=sort-by-rating-asc]').value;
    await fillIn('[data-test-rr=sort-selector]', ratingAscOption);

    assert.equal(currentURL(), '/bands/1/songs?sort=ratingAsc');
  });

  test('Search songs ', async function(assert) {
    let band = this.server.create('band', { name: 'Them Crooked Vultures' });
    this.server.create('song', { title: 'Elephants', rating: 5, band });
    this.server.create('song', { title: 'New Fang', rating: 4, band });
    this.server.create('song', { title: 'Mind Eraser, No Chaser', rating: 4, band });
    this.server.create('song', { title: 'Spinning in Daffodils', rating: 5, band });
    this.server.create('song', { title: 'No One Loves Me & Neither Do I', rating: 5, band });

    await loginAs('dave@tcv.com');

    await visit('/');
    await click('[data-test-rr=band-link]');
    await fillIn('[data-test-rr=search-box]', 'no');

    assert.equal(currentURL(), '/bands/1/songs?s=no');
    assert.dom('[data-test-rr=song-list-item]').exists({ count: 2 }, 'The songs matching the search term are displayed');

    const titleDescOption = find('[data-test-rr=sort-by-title-desc]').value;
    await fillIn('[data-test-rr=sort-selector]', titleDescOption);
    
    assert.ok(currentURL().includes('s=no'));
    assert.ok(currentURL().includes('sort=titleDesc'));
    assert.dom('[data-test-rr=song-list-item]:first-child').hasText('No One Loves Me & Neither Do I', 'A matching song that comes later in the alphabet appears on top');
    assert.dom('[data-test-rr=song-list-item]:last-of-type').hasText('Mind Eraser, No Chaser', 'A matching song that comes sooner in the alphabet appears at the bottom');
  });

  test('Visiting landing page without signing in', async function(assert) {
    await visit('/');

    assert.dom('[data-test-rr=form-header]').hasText('Log in to R&R');
    assert.dom('[data-test-rr=user-email]').doesNotExist();
  });
});
