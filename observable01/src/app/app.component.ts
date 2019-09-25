import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivate = false;
  subscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {

    // 1st
    // this.userService.activateEmitter.subscribe(isActivate => {
     // this.userActivate = isActivate;
    //})

    this.subscription = this.userService.activateEmitter.subscribe((data) => {
      this.userActivate = data;
    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
