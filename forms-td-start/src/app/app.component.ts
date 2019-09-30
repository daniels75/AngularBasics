import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // 2nd approach
  @ViewChild('f', {static: false}) singupForm: NgForm;
  defaultQuestion = 'teacher';
  answer = '';
  genders = ['male', 'female']

  suggestUserName() {

    const suggestedName = 'Superuser';

    // 1st approach setting value
    this.singupForm.setValue({
      userData: {
        username: suggestedName,
        email: ''
      },
      secret: 'pass',
      questionAnswer: '',
      gender: 'male'
    })

    // 2nd approach setting value
    this.singupForm.form.patchValue({
      userData: {
        username: suggestedName + "any"
      }
    })
  }






  // 1st approach
  onSubmit1(form: NgForm) {
    console.log('submited' + form)
  }

  onSubmit2() {
    console.log(this.singupForm);
  }

}
