import {Component} from 'angular2/core';
import {ArticleListComponent} from './article-list.component';
@Component({
	selector: 'my-app',
	template: `<h1>Hello {{greeting}}</h1>
				<input type="text" placeholder="type your name" [(ngModel)]="greeting">
                <article-list></article-list>
	`,
    directives: [ArticleListComponent]
})
export class AppComponent {
	private greeting: string = '';
}
