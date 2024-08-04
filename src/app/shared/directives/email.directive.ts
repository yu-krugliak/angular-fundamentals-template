import { Directive, forwardRef } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidatorDirective), multi: true }]
})
export class EmailValidatorDirective implements Validator{    
    private emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    validate(control: AbstractControl): ValidationErrors | null {
        const email = control.value;
        return !this.emailRegex.test(email) ? { invalidEmail: { value : email }} : null;
    }
    // Add your code here
}
