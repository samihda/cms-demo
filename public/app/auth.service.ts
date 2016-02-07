import {Http, Headers, RequestOptions} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    constructor(private _http: Http) {}
    
    login(credObj) {
        let body = JSON.stringify(credObj);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this._http.post('/api/login', body, options).map(res => res.json());
    }
    
    logout() {
        return this._http.get('/api/logout').map(res => res.json());
    }
}

export class User {
    constructor(
        public username: string,
        public password: string
    ) {}
}
