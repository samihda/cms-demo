import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {AuthService} from './auth.service';

@Component({
	template: `<h1>Sign up</h1>
                <form>
                    <div>
                        <label>Email:</label>
                        <input [(ngModel)]="email" type="text" name="email"/>
                    </div>
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
export class SignupComponent {
    public email: string;
    public username: string;
    public password: string;
    
    constructor(private _authService: AuthService) {}
    
    submit() {
        // form not validated!
        this._authService.signup(this.email, this.username, this.password).subscribe(
            data => {
                console.log(data);
                this._authService.serverRootRedirect();
            },
            error => console.log(error) 
        );
    }
}