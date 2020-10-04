import axios from "axios";

export default {
  
  fetchSongs: async (keywords = '', levels = [], offset = 0, limit = 50) => {
    let qs = [
      `_start=${encodeURIComponent(offset)}`,
      `_limit=${encodeURIComponent(limit)}`
    ];
    if (keywords) {
      qs.push(`search_like=${encodeURIComponent(keywords)}`);
    }
    for (let i = 0; i < levels.length; i++) {
      qs.push(`level=${encodeURIComponent(levels[i])}`);
    }
    let url = `http://${window.location.hostname}:3004/songs?${qs.join('&')}`;
    let res = await fetch(url);
    let count = Number(res.headers.get('X-Total-Count'));
    let songs = await res.json();
    return { songs, count };
  },
  
    postFavorites: (param) =>
    axios({
      'method': 'POST',
      'url': `http://${window.location.hostname}:3004/favorites/`,
      'data': {
      'songId': param
      }
    }),

    getFavorites: () =>
    axios({
      method: 'GET',
      url: `http://${window.location.hostname}:3004/favorites`,
    }),
    deleteFromFavorites: (param) =>
    axios({
      method: 'DELETE',
      url: `http://${window.location.hostname}:3004/favorites/${param}`
    }),
};
