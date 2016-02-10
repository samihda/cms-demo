import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Router} from 'angular2/router';
import {AuthService} from './auth.service';

@Component({
	template: `<form>
                    <div>
                        <label>Username:</label>
                        <input [(ngModel)]="username" type="text" name="username"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input [(ngModel)]="password" type="password" name="password"/>
                    </div>
                    <div>
                        <button type="button" (click)="submit()">Login</button>
                    </div>
                </form>
    `,
    providers: [AuthService]
})
export class LoginComponent {
    public username: string;
    public password: string;
    
    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {}
    
    submit() {
        this._authService.login(this.username, this.password).subscribe(
            data => {
                console.log(data);
                this._authService.serverRootRedirect();
                //this._router.navigate(['Home']);
            },
            error => console.log(error),
            () => console.log('logging in finished') 
        );
    }
}
