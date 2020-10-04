
import api from './api';

test('fetchSongs basic usage', async () => {
  let { songs, count } = await api.fetchSongs();
  expect(songs).toBeDefined();
  expect(Array.isArray(songs)).toBe(true);
  expect(songs.length).toBeGreaterThan(0);
  expect(typeof count).toBe('number');
  expect(count).toBeGreaterThan(0);
});

test('fetchSongs with keywords', async () => {
  let { songs } = await api.fetchSongs('traditional');
  expect(songs.length).toBeGreaterThan(0);
});

test('fetchSongs with levels', async () => {
  let { songs } = await api.fetchSongs('', [5, 6, 7, 8, 9, 10]);
  expect(songs.length).toBeGreaterThan(0);
});

test('add favorites', async () => {
  let favorites = await api.postFavorites('5b8e471cb3984c68ed81926d');
  expect(favorites).toBeDefined();
});

// test('delete from favorites', async () => {
//   await api.postFavorites('5b8e471cb3984c68ed81926d').then()
  
//   let response = await api.deleteFromFavorites('5b8e471cb3984c68ed81926d');
//   console.log(deleted);
//   expect(response.statusCode).toBe(200);
// });