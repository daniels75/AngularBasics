import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";


export class SimpleInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request has been intercepted by SimpleInterceptor')

    return next.handle(req).pipe(tap(event => {
      console.log(event)
      if (event.type == HttpEventType.Response) {
        console.log('response body retrieved');
        console.log(event.body);
      }
    }));
  }
}
