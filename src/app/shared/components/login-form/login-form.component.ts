import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  toggleOff : IconDefinition = faEyeSlash;
  toggleOn : IconDefinition = faEye;
  

  user = {
    email: '',
    password: ''
  };

  onSubmit() {
    console.log(this.loginForm.submitted);
  }
  //Use the names `email` and `password` for form controls.
}
