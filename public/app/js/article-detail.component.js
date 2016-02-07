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
    var ArticleDetailComponent;
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
            ArticleDetailComponent = (function () {
                function ArticleDetailComponent(_articleService, _routeParams) {
                    this._articleService = _articleService;
                    this._routeParams = _routeParams;
                }
                ArticleDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = this._routeParams.get('id');
                    this._articleService.getArticle(id).subscribe(function (data) {
                        //this.article = new Article(data._id, data.title, data.body);
                        _this.id = data._id;
                        _this.title = data.title;
                        _this.body = data.body;
                    }, function (error) { return alert(error); }, function () { return console.log('finished fetching article'); });
                };
                ArticleDetailComponent = __decorate([
                    core_1.Component({
                        template: "<h2>{{title}}</h2>\n                <p>{{body}}</p>\n                <p>{{date}}</p>\n    ",
                        providers: [article_service_1.ArticleService]
                    }), 
                    __metadata('design:paramtypes', [article_service_1.ArticleService, router_1.RouteParams])
                ], ArticleDetailComponent);
                return ArticleDetailComponent;
            })();
            exports_1("ArticleDetailComponent", ArticleDetailComponent);
        }
    }
});
