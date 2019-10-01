import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsers = ['Kris' , 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData' : new FormGroup( {
        'username': new FormControl(null, [Validators.required, this.forbidenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })
  }

  onSubmit() {
    console.log(this.signupForm)
  }

  onAddHobby() {
    const control: FormControl = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getHobbies() {
      return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbidenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsers && this.forbiddenUsers.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }
}
