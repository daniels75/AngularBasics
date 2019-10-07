import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";
import {Post} from "./post.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
      this.http.post<{name: string}>('https://ng-complete-guid-bb057.firebaseio.com/posts.json', postData)
      // Send Http request
        .subscribe((response) => {
            console.log(response);
        })
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.http.get<{[key: string] : Post}>('https://ng-complete-guid-bb057.firebaseio.com/posts.json')
      .pipe(map((responseData: {[key: string] : Post}) => {
        const postArray: Post[] = [];
        for (const key in responseData) {
          console.log('respsoneData: ', responseData);
          if (responseData.hasOwnProperty(key)) {
              postArray.push({...responseData[key], id: key});
          }
        }
        return postArray;
      }))
      .subscribe(posts => {
        console.log(posts);
        this.loadedPosts = posts;
      })
  }

  onClearPosts() {
    // Send Http request
  }
}
