import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormArray, Validators, AbstractControl,FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  userForm: FormGroup = this.formBuilder.group({
    firstName: ['',[Validators.required, Validators.minLength(3)]],
    lastName: ['',[ Validators.required, Validators.minLength(3)]],
    age: ['', [Validators.required, Validators.min(18),this.ageValidator]],
    phones: this.formBuilder.array([this.formBuilder.control(null)],[Validators.required]),
    permanentAddresschecbox: [''],
    currentAddress: this.formBuilder.group({
      addressline1: ['',[Validators.required, Validators.minLength(3)]],
      addressline2: ['',[Validators.required, Validators.minLength(3)]],
      addressline3: ['',[Validators.required, Validators.minLength(3)]]
    }),
    permanentAddress: this.formBuilder.group({
      addressline1: ['',[Validators.required, Validators.minLength(3)]],
      addressline2: ['',[Validators.required, Validators.minLength(3)]],
      addressline3: ['',[Validators.required, Validators.minLength(3)]]
    })
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  createForm(){
    return this.formBuilder.group({
      firstName: ['',[Validators.required, Validators.minLength(3)]],
      lastName: ['',[ Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(18)]],
      phones: this.formBuilder.array([
        this.formBuilder.control(null)
      ])
    });
  }

  addPhone(): void {
    (this.userForm.get('phones') as FormArray).push(
      this.formBuilder.control(null)
    );
  }

  removePhone(index: any) {
    (this.userForm.get('phones') as FormArray).removeAt(index);
  }

  getPhonesFormControls(): AbstractControl[] {
    return (<FormArray> this.userForm.get('phones')).controls
  }
  
  eventCheck(event: any){
    if(event.target.checked){
      this.userForm.controls['permanentAddress'].patchValue(this.userForm.controls['currentAddress'].value);
    }
    console.log(this.userForm.controls['currentAddress'].value);
}
addressChange(event:any){
  if(this.userForm.controls['permanentAddresschecbox'].value){
  this.userForm.controls['permanentAddress'].patchValue(this.userForm.controls['currentAddress'].value);
  }
}
permanentaddressChange(event:any){
  if(this.userForm.controls['permanentAddresschecbox'].value){
  this.userForm.controls['currentAddress'].patchValue(this.userForm.controls['permanentAddress'].value);
  }
}

findDuplicate(name: any, p:any): any {
  let myArray = this.getPhonesFormControls();

  // console.log(myArray);
  let test = myArray.filter(data => data.value == name.value && name != null);

  if (test.length > 1) {
     return true;
  } else {
    return false
}
}


get firstName() {
  return this.userForm.get('firstName');
}

get lastName() {
  return this.userForm.get('lastName');
}
get age() {
  return this.userForm.get('age');
}
get currentAddressLine1() {
  return this.userForm.controls['currentAddress'].get('addressline1');
}
get currentAddressLine2() {
  return this.userForm.controls['currentAddress'].get('addressline2');
}
get currentAddressLine3() {
  return this.userForm.controls['currentAddress'].get('addressline3');
}
get permanentAddressLine1() {
  return this.userForm.controls['permanentAddress'].get('addressline1');
}
get permanentAddressLine2() {
  return this.userForm.controls['permanentAddress'].get('addressline2');
}
get permanentAddressLine3() {
  return this.userForm.controls['permanentAddress'].get('addressline3');
}
  onSubmit(){
    console.log(this.userForm);
  }

  showstatus(){
    console.log(this.userForm);
  }

  ageValidator(formControl: FormControl): { [key: string]: boolean } | null {
    let age = formControl.value;
    age = new Date (age);
    let today = new Date(Date.now());
    console.log(today);
    if (((today.getTime() - age.getTime())/ (1000 * 3600 * 24)) < 6570) {
        return { ageInValid: true };
    }
    return null;
  }
}
