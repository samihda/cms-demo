System.register(['angular2/core', './auth.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, auth_service_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_authService) {
                    this._authService = _authService;
                }
                LoginComponent.prototype.onSubmit = function () {
                    var user = new auth_service_1.User('boo', '234');
                    this._authService.login(user).subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); }, function () { return console.log('logging in finished'); });
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        template: "<form (ngSubmit)=\"onSubmit()\" action=\"/api/login\" method=\"post\" >\n                    <div>\n                        <label>Username:</label>\n                        <input [(ngModel)]=\"username\" type=\"text\" name=\"username\"/>\n                    </div>\n                    <div>\n                        <label>Password:</label>\n                        <input [(ngModel)]=\"password\" type=\"password\" name=\"password\"/>\n                    </div>\n                    <div>\n                        <input type=\"submit\" value=\"Login\"/>\n                    </div>\n                </form>\n    ",
                        providers: [auth_service_1.AuthService]
                    }), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService])
                ], LoginComponent);
                return LoginComponent;
            })();
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
