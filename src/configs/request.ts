import ky from 'ky';

export const request = ky.extend({
  prefixUrl: 'https://api.spotify.com/v1',
});
