import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const decodedToken = jwtDecode<JwtPayload>(this.getToken());
    return decodedToken;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return token;
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);

      if (!decodedToken.exp) {
        localStorage.removeItem('id_token');
        return true;
      }

       return Date.now() >= decodedToken.exp * 1000;

    } catch (err) {
      return true;
    }
  }

  getToken(): string {
    // TODO: return the token
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // TODO: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
