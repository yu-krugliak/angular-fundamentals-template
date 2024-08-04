import { Component } from '@angular/core';
import { AbstractControl, EmailValidator, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService, UserModel } from '@app/auth/services/auth.service';
import { EmailValidatorDirective } from '@app/shared/directives/email.directive';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;
  // Use the names `name`, `email`, `password` for the form controls.
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registrationForm = fb.group({
      name: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, this.useEmailValidator()]],
      password: ["", [Validators.required]]
    })
  };

  useEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const directive = new EmailValidatorDirective();
      return directive.validate(control);
    };
  }
  
  get getName() {
    return this.registrationForm.get("name");
  }

  get getEmail() {
    return this.registrationForm.get("email");
  }

  get getPassword() {
    return this.registrationForm.get("password");
  }

  onSubmit() {
    this.registrationForm.markAsTouched(); 
    console.log(this.registrationForm.status);
  }
}
