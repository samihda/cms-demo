import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {AuthService} from './auth.service';

@Component({
	template: `<h1>Log in</h1>
                <form>
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
    
    constructor(private _authService: AuthService) {}
    
    submit() {
        // form not validated!
        this._authService.login(this.username.trim(), this.password.trim()).subscribe(
            data => {
                alert(data.message);
                this._authService.serverRootRedirect();
            },
            error => console.log(error),
            () => console.log('logging in finished')
        );
    }
}
