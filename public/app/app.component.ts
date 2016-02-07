import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ArticleListComponent} from './article-list.component';
import {ArticleDetailComponent} from './article-detail.component';
import {LoginComponent} from './login.component';
@Component({
	selector: 'my-app',
	template: `<nav>
                    <a [routerLink]="['Articles']">Articles</a>
                    <a [routerLink]="['Login']">Login</a>
                </nav>
                <router-outlet></router-outlet>
	`,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {
        path:'/articles',
        name: 'Articles',
        component: ArticleListComponent,
        useAsDefault: true
    },
    {
        path:'/articles/:id',
        name: 'Article',
        component: ArticleDetailComponent
    },
    {
        path:'/login',
        name: 'Login',
        component: LoginComponent
    }
])
export class AppComponent {}
