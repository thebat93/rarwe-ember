import { click, fillIn } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

// кастомный хелпер для создания группы
export async function createBand (name) {
  await click('[data-test-rr=new-band-label]');
  await fillIn('[data-test-rr=new-band-input]', name);
  await click('[data-test-rr=new-band-button]');
}

// кастомный хелпер для создания песни
export async function createSong (title) {
  await click('[data-test-rr=new-song-label]');
  await fillIn('[data-test-rr=new-song-input]', title);
  await click('[data-test-rr=new-song-button]');
}

export async function loginAs(email) {
    return authenticateSession({ token: 'a.signed.jwt', userEmail: email });
}