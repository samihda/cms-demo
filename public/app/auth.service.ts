import {Http, Headers, RequestOptions} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';

class LoginState {
    //public state: string = document.getElementById('root').dataset.user; 
    
    getState(): boolean {
        return document.getElementById('root').dataset.user === 'true' ? true : false;
        //return this.state === 'true' ? true : false;
    }
    
    // setLoginState() {
    //     document.getElementById('root').dataset.user = true;
    // }
    
    // setLogoutState() {
    //     document.getElementById('root').dataset.user = true;
    // }
}

@Injectable()
export class AuthService {
    //public user: boolean = document.getElementById('root').dataset.user === 'true' ? true : false;
    
    constructor(private _http: Http) {}
    
    serverRootRedirect() {
        //this._http.get('/');        
        window.location.replace(window.location.origin);
    }
    
    checkAuth(): boolean {
        //console.log('checking auth status...');
        return document.getElementById('root').dataset.user === 'true' ? true : false;
        //return this._loginState.getState();
    }
    
    login(usr: string, pwd: string) {
        if (this.checkAuth()) {
            throw 'already logged in';
        }
        else {
            // input not sanitized!
            let body = 'username=' + usr + '&password=' + pwd;
            let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
            let options = new RequestOptions({headers: headers});
            return this._http.post('/api/login', body, options).map(res => res.json());
        }
    }
    
    logout() {
        if (!this.checkAuth()) {
            throw 'already logged out';
        }
        else {
            return this._http.get('/api/logout');
        }
    }
}

// export function loginState(): boolean {
//     console.log('loginState() triggered');
//     return document.getElementById('root').dataset.user === 'true' ? true : false;
// }

// export class User {
//     constructor(
//         public username: string,
//         public password: string
//     ) {}
// }
