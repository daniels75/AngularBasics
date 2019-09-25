import {EventEmitter, Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // 1st approach
  // activateEmitter = new EventEmitter<boolean>();
  // 2nd approach

  activateEmitter = new Subject<boolean>()
}
