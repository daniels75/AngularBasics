import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
      this.http.post('https://ng-complete-guid-bb057.firebaseio.com/posts.json', postData)
      // Send Http request
        .subscribe((response) => {
            console.log(response);
        })
  }

  onFetchPosts() {

  }

  onClearPosts() {
    // Send Http request
  }
}
