import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {AuthService} from './auth.service';
import {HomeComponent} from './home.component';
import {LoginComponent} from './login.component';
import {ArticleListComponent} from './article-list.component';
import {ArticleDetailComponent} from './article-detail.component';

@Component({
	selector: 'my-app',
	template: `<nav>
                    <a [routerLink]="['Home']">Home</a>
                    <a [routerLink]="['Articles']">Articles</a>
                    <a *ngIf="!user" [routerLink]="['Login']">Login</a>
                    <a *ngIf="user" href="/logout" (click)="logout($event)">Logout</a>
                </nav>
                <router-outlet></router-outlet>
	`,
    directives: [ROUTER_DIRECTIVES],
    providers: [AuthService]
})
@RouteConfig([
    {
        path:'/',
        name: 'Home',
        component: HomeComponent,
        useAsDefault: true
    },
    {
        path:'/articles',
        name: 'Articles',
        component: ArticleListComponent
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
export class AppComponent {
    public user: boolean = this._authService.checkAuth();
    
    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {}
    
    logout(event) {
        console.log(event.cancelable);
        event.preventDefault();
        console.log(event.defaultPrevented);
        this._authService.logout().subscribe(
            data => {
                console.log(data);
                this._authService.serverRootRedirect();
                //this._router.navigate(['Home']);
            },
            error => console.log(error),
            () => console.log('logging out finished') 
        );
    }
}
