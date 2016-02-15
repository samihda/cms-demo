import {Http, Headers, RequestOptions} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Article} from './article';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService {
    constructor(private _http: Http) {}
    
    getArticles() {
        return this._http.get('/api/public').map(res => res.json());
    }
    
    getArticle(id: string) {
        return this._http.get('/api/public/' + id).map(res => res.json());
    }
    
    postArticle(title: string, body: string) {
        // sanitize input!
        let reqBody = 'title=' + title + '&body=' + body;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
        return this._http.post('/api/protected', reqBody, options).map(res => res.json());
    }
    
    updateArticle(id: string, title: string, body: string) {
        // sanitize input!
        let reqBody = 'title=' + title + '&body=' + body;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
        return this._http.put('/api/protected/' + id, reqBody, options).map(res => res.json());
    }
    
    getUserArticles() {
        return this._http.get('/api/protected').map(res => res.json());
    }
    
    deleteArticle(id: string) {
        return this._http.delete('/api/protected/' + id).map(res => res.json());
    }
}
