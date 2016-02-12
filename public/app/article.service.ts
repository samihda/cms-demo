import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';

// export class Article {
//     constructor(
//         public id: string,
//         public title: string,
//         public body: string
//     ) {}
// }

@Injectable()
export class ArticleService {
    constructor(private _http: Http) {}
    
    getArticles() {
        return this._http.get('/api/public').map(res => res.json());
    }
    
    getArticle(id: string) {
        return this._http.get('/api/public/' + id).map(res => res.json());
    }
    
    getUserArticles() {
        return this._http.get('/api/protected').map(res => res.json());
    }
}
