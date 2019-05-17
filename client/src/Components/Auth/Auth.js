import auth0 from 'auth0-js';

export default class Auth {
    auth0 = new auth0.WebAuth({
      domain: 'musicmap.auth0.com',
      clientID: 'KWCw9ocLQmecYBuLk6M4m2ijyanB1r0w',
      redirectUri: 'http://localhost:3000/',
      responseType: 'token id_token',
      scope: 'openid'
    });

    login() {
      this.auth0.authorize();
    }
}