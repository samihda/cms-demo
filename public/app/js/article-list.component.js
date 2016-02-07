System.register(['angular2/core', 'angular2/router', './article.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, article_service_1;
    var ArticleListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (article_service_1_1) {
                article_service_1 = article_service_1_1;
            }],
        execute: function() {
            ArticleListComponent = (function () {
                function ArticleListComponent(_articleService) {
                    this._articleService = _articleService;
                }
                ArticleListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._articleService.getArticles().subscribe(function (data) { return _this.articles = data; }, function (error) { return alert(error); }, function () { return console.log('finished fetching list'); });
                };
                ArticleListComponent = __decorate([
                    core_1.Component({
                        template: "<ul *ngIf=\"articles\">\n                <li *ngFor=\"#article of articles\">\n                    <a [routerLink]=\"['Article', { id: article._id }]\">{{article.title}}</a>\n                </li>\n                </ul>\n    ",
                        providers: [article_service_1.ArticleService],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [article_service_1.ArticleService])
                ], ArticleListComponent);
                return ArticleListComponent;
            })();
            exports_1("ArticleListComponent", ArticleListComponent);
        }
    }
});
