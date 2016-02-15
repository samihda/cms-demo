import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {ArticleService} from './article.service';
import {Article} from './article';

@Component({
	template: `<h1>Articles</h1>
                <ul *ngIf="articles">
                    <li *ngFor="#article of articles">
                        <a [routerLink]="['Article', { id: article._id }]">{{article.title}}</a>
                    </li>
                </ul>
                <p *ngIf="articles == false">No articles found.</p>
    `,
    providers: [ArticleService],
    directives: [ROUTER_DIRECTIVES]
})
export class ArticleListComponent implements OnInit {
	public articles: Article[];
    
    constructor(private _articleService: ArticleService) {}
    
    ngOnInit() {
        this._articleService.getArticles().subscribe(
            data => this.articles = data,
            error => alert(error),
            () => console.log('finished fetching list')
        );
    }
}
