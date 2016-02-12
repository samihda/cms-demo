import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
//import {NgForm} from 'angular2/common';
import {ArticleService} from './article.service';

@Component({
	template: `<h1>Profile</h1>
                <ul *ngIf="articles">
                    <li *ngFor="#article of articles">
                        <a href="#">{{article.title}}</a>
                    </li>
                </ul>
    `,
    providers: [ArticleService],
    directives: [ROUTER_DIRECTIVES]
})
export class ProfileComponent implements OnInit {
    // auth redirect?
    public articles;
    
    constructor(private _articleService: ArticleService) {}
    
    ngOnInit() {
        this._articleService.getUserArticles().subscribe(
            data => this.articles = data,
            error => alert(error)
        );
    }
}
