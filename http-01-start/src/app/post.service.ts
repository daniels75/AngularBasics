import {Injectable} from "@angular/core";
import {Post} from "./post.model";
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Injectable({providedIn: 'root'})
export class PostService {

  private baseUrl: string = 'https://ng-complete-guid-bb057.firebaseio.com/posts.json';

  errorSubject = new Subject<string>();
  constructor(private http: HttpClient) {

  }

  createPost(postData: Post ) {
    this.http.post<{name: string}>(this.baseUrl, postData,
      {
        observe: 'response'
      }
      )
    // Send Http request
      .subscribe((response) => {
        console.log(response);
      }, (error) => {
        this.errorSubject.next(error.message);
      })
  }

  fetchPosts() {
      let searchParams  = new HttpParams();
      searchParams = searchParams.append('print', 'pretty');
      searchParams = searchParams.append('anotherParameter', 'anotherParam1');
      return this.http.get<{ [key: string]: Post }>(this.baseUrl,
        {
          headers: new HttpHeaders({'Custom-Header':  'Simple Custom header'}),
          // params: new HttpParams().set('print', 'pretty')
          params: searchParams
        }
        )
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
    return this.http.delete(this.baseUrl, {
      observe: "events"
    }
    )
      .pipe(tap(event => {
        console.log(event)
        if (event.type === HttpEventType.Sent) {
          // console.log(event.type)
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body)
        }
      }))
  }

}
