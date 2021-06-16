import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    passWord: ['', [Validators.required, Validators.maxLength(3)]]
  });
  
  constructor(private fb: FormBuilder, private router:Router) { 
}
  
  ngOnInit(): void {
  }
get userName() {
    return this.loginForm.get('userName');
  }
 
  get passWord() {
    return this.loginForm.get('passWord');
  }

  logInSubmit(){
    alert("Successfully Logged in");
    const tempSessionVar=JSON.parse(sessionStorage.getItem('user')|| '{}');
    if((tempSessionVar[0].userName === this.loginForm.get('userName')?.value) && (tempSessionVar[0].passWord === this.loginForm.get('passWord')?.value)){
      this.router.navigate(['/signin'])
    }
  }
}
