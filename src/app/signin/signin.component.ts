import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    passWord: ['', [Validators.required, Validators.minLength(3)]],
    confirmPassWord: ['', [Validators.required, Validators.minLength(3)]]
  }, {
    validator: this.MustMatch('password', 'confirmPassword')
});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  get userName() {
    return this.signinForm.get('userName');
  }
 
  get confirmPassWord() {
    return this.signinForm.get('confirmPassWord');
  }
  get passWord() {
    return this.signinForm.get('passWord');
  }
  signInSubmit(){
    alert("Successfully Logged in");
    let key = 'user'; 
    let value = {'userName':this.signinForm.controls['userName'].value,'passWord':this.signinForm.controls['passWord'].value};

    sessionStorage.setItem(key, JSON.stringify(value));
    this.signinForm.reset();
  }

MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls['passWord'];
      const matchingControl = formGroup.controls['confirmPassWord'];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}

}
