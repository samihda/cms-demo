import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {ArticleService} from './article.service';
import {Article} from './article';

@Component({
	template: `<h1>{{title}}</h1>
                <p>{{body}}</p>
                <p>{{date}}</p>
    `,
    providers: [ArticleService]
})
export class ArticleDetailComponent implements OnInit {
    //public article: Article;
    id: string;
    title: string;
    body: string;
    
    constructor(
        private _articleService: ArticleService,
        private _routeParams: RouteParams
    ) {}
    
    ngOnInit() {
        const id: string = this._routeParams.get('id');
        this._articleService.getArticle(id).subscribe(
            data => {
                this.id = data._id;
                this.title = data.title;
                this.body = data.body;
                //this.article = data;
            },
            error => alert(error),
            () => console.log('finished fetching article')
        );
    }
}
