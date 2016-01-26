import {Component} from 'angular2/core';
import {ArticleService} from './article.service';
import {OnInit} from 'angular2/core';

@Component({
	selector: 'article-list',
	template: `<ul *ngIf="articles">
                <li *ngFor="#article of articles">
                    <a href="/articles/{{article._id}}">{{article.title}}</a>
                </li>
                </ul>
    `,
    providers: [ArticleService]
})
export class ArticleListComponent implements OnInit {
	public articles: any;
    
    constructor(private _articleService: ArticleService) {}
    
    ngOnInit(): any {
        this._articleService.getArticles().subscribe(
            data => this.articles = data,
            error => alert(error),
            () => console.log('request completed')
        );
    }
}
