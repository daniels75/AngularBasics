import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // 2nd approach
  @ViewChild('f') singupForm: NgForm;
  defaultQuestion = 'pet';

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // 1st approach
  // onSubmit(form: NgForm) {
  //   console.log('submited' + form)
  // }

  onSubmit() {
    console.log(this.singupForm);
  }

}
