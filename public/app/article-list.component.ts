import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {ArticleService} from './article.service';
import {OnInit} from 'angular2/core';

@Component({
	template: `<ul *ngIf="articles">
                <li *ngFor="#article of articles">
                    <a [routerLink]="['Article', { id: article._id }]">{{article.title}}</a>
                </li>
                </ul>
    `,
    providers: [ArticleService],
    directives: [ROUTER_DIRECTIVES]
})
export class ArticleListComponent implements OnInit {
	articles;
    
    constructor(private _articleService: ArticleService) {}
    
    ngOnInit(): any {
        this._articleService.getArticles().subscribe(
            data => this.articles = data,
            error => alert(error),
            () => console.log('finished fetching list')
        );
    }
}
