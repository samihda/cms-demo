import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
//import {NgForm} from 'angular2/common';
import {ArticleService} from './article.service';
//import {Article} from './article';

@Component({
	template: `<h1>Profile</h1>
                <h2>Your articles</h2>
                    <ul *ngIf="articles">
                        <li *ngFor="#article of articles">
                            {{article.title}}
                            <button (click)="edit(article)" class="edit">Edit</button>
                            <button (click)="delete(article._id)" class="delete">Delete</button>
                        </li>
                    </ul>
                    <p *ngIf="articles == false">No articles found.</p>
                <fieldset id="new">
                    <legend>New article</legend>
                    <div>
                        <label>Title:</label>
                        <input [(ngModel)]="title" type="text" name="title" />
                    </div>
                    <div>
                        <label>Body:</label>
                        <textarea [(ngModel)]="body" name="body" rows="10" cols="50"></textarea>
                    </div>
                    <div>
                        <button type="button" (click)="post()">Save</button>
                    </div>
                </fieldset>
                <fieldset id="edit">
                    <legend>Edit article</legend>
                    <input [(ngModel)]="id" type="hidden" name="id" /> 
                    <div>
                        <label>Title:</label>
                        <input [(ngModel)]="title" type="text" name="title" />
                    </div>
                    <div>
                        <label>Body:</label>
                        <textarea [(ngModel)]="body" name="body" rows="10" cols="50"></textarea>
                    </div>
                    <div>
                        <button type="button" (click)="update()">Update</button>
                        <button type="button" (click)="closeEditor()">Cancel</button>
                    </div>
                </fieldset>
    `,
    providers: [ArticleService],
    directives: [ROUTER_DIRECTIVES]
})
export class ProfileComponent implements OnInit {
    // auth redirect?
    public articles;
    public title;
    public body;
    public id;
    
    constructor(private _articleService: ArticleService) {}
    
    ngOnInit() {
        this.refresh();
    }
    
    refresh() {
        this._articleService.getUserArticles().subscribe(
            data => {
                this.articles = data;
            },
            error => alert(error)
        );
        
        this.closeEditor();
    }
    
    clearInput() {
        this.title = '';
        this.body = '';
        this.id = '';
    }
    
    edit(article) {
        document.getElementById('edit').style.display = 'block';
        document.getElementById('new').style.display = 'none';
        this.title = article.title;
        this.body = article.body;
        this.id = article._id;
    }
    
    closeEditor() {
        this.clearInput();
        document.getElementById('edit').style.display = 'none';
        document.getElementById('new').style.display = 'block';
    }
    
    post() {
        this._articleService.postArticle(this.title.trim(), this.body.trim()).subscribe(
            data => {
                this.refresh();
                console.log(data.message);
            },
            error => alert(error)
        );
    }
    
    update() {
        this._articleService.updateArticle(this.id, this.title.trim(), this.body.trim()).subscribe(
            data => {
                this.refresh();
                console.log(data.message);
            },
            error => alert(error)
        )
    }
    
    delete(id: string) {
        if (confirm('Are you sure?')) {
            this._articleService.deleteArticle(id).subscribe(
                data => {
                    this.refresh();
                    console.log(data.message);
                },
                error => alert(error) 
            );
        }
    }
    
}
