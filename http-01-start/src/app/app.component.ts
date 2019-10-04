import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
      this.http.post('https://ng-complete-guid-bb057.firebaseio.com/posts.json', postData)
      // Send Http request
        .subscribe((response) => {
            console.log(response);
        })
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.http.get('https://ng-complete-guid-bb057.firebaseio.com/posts.json')
      .pipe(map(responseData => {
        const postArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
              postArray.push({...responseData[key], id: key});
          }
        }
        return postArray;
      }))
      .subscribe(posts => {
        console.log(posts);
      })
  }

  onClearPosts() {
    // Send Http request
  }
}
