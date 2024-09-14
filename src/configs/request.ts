import ky from 'ky';

export const request = (type: 'route-handler' | 'spotify') => ky.extend({
  prefixUrl: type === 'spotify' ? 'https://api.spotify.com/v1' : '/api',
});
