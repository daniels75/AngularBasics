import { Component, OnInit } from '@angular/core';
import {Post} from "./post.model";
import {PostService} from "./post.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetchingData: boolean;

  constructor(private postService: PostService) {}

  ngOnInit() {
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
    this.postService.fetchPosts()
      .subscribe(posts => {
        this.isFetchingData = false;
        console.log(posts);
        this.loadedPosts = posts;
      })
  }


  onClearPosts() {
    this.postService.deletePosts().subscribe( () => {
      console.log("all post deleted")
      this.loadedPosts = [];
    })
  }
}
