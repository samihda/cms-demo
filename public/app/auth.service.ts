import {Http, Headers, RequestOptions} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    constructor(private _http: Http) {}
    
    serverRootRedirect() {
        window.location.replace(window.location.origin);
    }
    
    checkAuth(): boolean {
        return document.getElementById('root').dataset.user === 'true' ? true : false;
    }
    
    signup(email: string, usr: string, pwd: string) {
        if (this.checkAuth()) {
            this.logout();
        }
        
        // input not sanitized!
        let body = 'email=' + email + '&username=' + usr + '&password=' + pwd;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
        return this._http.post('/api/signup', body, options).map(res => res.json());
    }
    
    login(usr: string, pwd: string) {
        if (this.checkAuth()) {
            console.log('already logged in');
            return;
        }
        // input not sanitized!
        let body = 'username=' + usr + '&password=' + pwd;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
        return this._http.post('/api/login', body, options).map(res => res.json());
        //return this._http.post('/api/login', body, options);
    }
    
    logout() {
        if (!this.checkAuth()) {
            console.log('already logged out');
            return;
        }
        return this._http.get('/api/logout');
    }
}
