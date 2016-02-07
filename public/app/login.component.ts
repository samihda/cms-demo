import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {AuthService, User} from './auth.service'

@Component({
	template: `<form (ngSubmit)="onSubmit()" action="/api/login" method="post" >
                    <div>
                        <label>Username:</label>
                        <input [(ngModel)]="username" type="text" name="username"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input [(ngModel)]="password" type="password" name="password"/>
                    </div>
                    <div>
                        <input type="submit" value="Login"/>
                    </div>
                </form>
    `,
    providers: [AuthService]
})
export class LoginComponent {
    public username: string;
    public password: string;
    
    constructor(private _authService: AuthService) {}
    
    onSubmit() {
        let user = new User('boo', '234');
        
        this._authService.login(user).subscribe(
            data => console.log(data),
            error => console.log(error),
            () => console.log('logging in finished') 
        );
    }
}
