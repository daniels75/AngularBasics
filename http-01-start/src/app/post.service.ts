import {Injectable} from "@angular/core";
import {Post} from "./post.model";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Subject, throwError} from "rxjs";
import {error} from "@angular/compiler/src/util";

@Injectable({providedIn: 'root'})
export class PostService {

  private baseUrl: string = 'https://ng-complete-guid-bb057.firebaseio.com/posts.json';

  errorSubject = new Subject<string>();
  constructor(private http: HttpClient) {

  }

  createPost(postData: Post ) {
    this.http.post<{name: string}>(this.baseUrl, postData)
    // Send Http request
      .subscribe((response) => {
        console.log(response);
      }, (error) => {
        this.errorSubject.next(error.message);
      })
  }

  fetchPosts() {
      return this.http.get<{ [key: string]: Post }>(this.baseUrl)
        .pipe(map((responseData: { [key: string]: Post }) => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            console.log('responseData: ', responseData);
            if (responseData.hasOwnProperty(key)) {
              postArray.push({...responseData[key], id: key});
            }
          }
          return postArray;
        }),
        catchError((errorRes) => {
            return throwError(errorRes);
          })
        );
  }

  deletePosts() {
    return this.http.delete(this.baseUrl);
  }

}
