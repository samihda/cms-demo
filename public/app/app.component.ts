import {Component, OnInit} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {AuthService} from './auth.service';
import {HomeComponent} from './home.component';
import {LoginComponent} from './login.component';
import {SignupComponent} from './signup.component';
import {ProfileComponent} from './profile.component';
import {ArticleListComponent} from './article-list.component';
import {ArticleDetailComponent} from './article-detail.component';

@Component({
	selector: 'my-app',
	template: `<nav>
                    <a [routerLink]="['Home']">Home</a>
                    <a [routerLink]="['Articles']">Articles</a>
                    <a *ngIf="!user" [routerLink]="['Login']">Log in</a>
                    <a *ngIf="!user" [routerLink]="['Signup']">Sign up</a>
                    <a *ngIf="user" [routerLink]="['Profile']">Profile</a>
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
        component: HomeComponent
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
        path:'/profile',
        name: 'Profile',
        component: ProfileComponent
    },
    {
        path:'/login',
        name: 'Login',
        component: LoginComponent
    },
    {
        path:'/signup',
        name: 'Signup',
        component: SignupComponent
    }
])
export class AppComponent implements OnInit {
    public user: boolean = this._authService.checkAuth();
    
    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {}
    
    logout(event) {
        event.preventDefault();
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
    
    ngOnInit() {
        this.user ? this._router.navigate(['Profile']) : this._router.navigate(['Home']);  
        // if (this.user) {
        //     this._router.navigate(['Profile']);
        // }
        // else {
        //     this._router.navigate(['Home']);
        // }
    }
}
