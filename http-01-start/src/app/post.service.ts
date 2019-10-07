import {Injectable} from "@angular/core";
import {Post} from "./post.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class PostService {

  constructor(private http: HttpClient) {

  }

  createPost(postData: Post ) {
    this.http.post<{name: string}>('https://ng-complete-guid-bb057.firebaseio.com/posts.json', postData)
    // Send Http request
      .subscribe((response) => {
        console.log(response);
      })
  }

  fetchPosts() {
      return this.http.get<{ [key: string]: Post }>('https://ng-complete-guid-bb057.firebaseio.com/posts.json')
        .pipe(map((responseData: { [key: string]: Post }) => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            console.log('responseData: ', responseData);
            if (responseData.hasOwnProperty(key)) {
              postArray.push({...responseData[key], id: key});
            }
          }
          return postArray;
        }));
  }
}
