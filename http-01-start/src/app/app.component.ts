import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "./post.model";
import {PostService} from "./post.service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetchingData: boolean;
  error: String = null;
  errorSubject: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.errorSubject = this.postService.errorSubject.subscribe(errorMsg => {
      this.error = errorMsg;
    })
    this.fetchAllPosts();
  }

  onCreatePost(postData: Post) {
    this.postService.createPost(postData);
  }


  onFetchPosts() {
    this.fetchAllPosts();
  }

  private fetchAllPosts() {
    this.isFetchingData = true;
    this.error = null;
    this.postService.fetchPosts()
      .subscribe(posts => {
        this.isFetchingData = false;
        console.log(posts);
        this.loadedPosts = posts;
      },
        (error) => {
        this.error = error.message;
          console.log('cannot fetch data ' + error.message)
      })
  }


  onClearPosts() {
    this.postService.deletePosts().subscribe( () => {
      console.log("all post deleted")
      this.loadedPosts = [];
    })
  }

  ngOnDestroy(): void {
    this.errorSubject.unsubscribe();
  }
}
