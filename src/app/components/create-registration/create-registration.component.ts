import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.css']
})
export class CreateRegistrationComponent implements OnInit {


favoriteSeason!: string;
trainerOptions: string[] = ['Yes', 'No', 'Maybe'];
gymOptions: string[] = ['Never', 'Yes', 'Long time'];
public packages = ["Monthly", "Yearly", "Quarterly"];
public genders = ["Male", "Female", "Other"];
importantList: string[] = [
  'Toxic fat reduction',
  'Energy and Endurance',
  'Building lean muscle',
  'Healthier digestive system',
  'Sugar craving body',
  'Fitness'
];

public registerForm!: FormGroup;
public userToUpdate!: number;
public isUpdateActive = false;

constructor(
  private fb: FormBuilder, 
  private api: ApiService, 
  private router: Router,
  private activatedRoute: ActivatedRoute,
  private toastService: NgToastService) {
}

ngOnInit(): void {
  
  this.registerForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern('^([0-9]{3}-[0-9]{3}-[0-9]{4}|[0-9]{10})$'), Validators.required]],
    weight: [''],
    height: [''],
    bmi: [''],
    bmiResult: [''],
    requireTrainer: [''],
    userGender: [''],
    userPackage: [''],
    userGoals: [''],
    beenInGym: [''],
    enquiryDate: ['']
  })

  this.registerForm.controls['height'].valueChanges.subscribe(res => {
    this.calculateBmi(res);
  });

  this.activatedRoute.params.subscribe(val =>{
    this.userToUpdate = val['id'];
    this.api.getRegisterdUserId(this.userToUpdate)
    .subscribe(res=>{
      this.isUpdateActive = !this.isUpdateActive;
      this.fillFormToUpdate(res);
    })
  })
}


updateUser() {
  this.api.updateRegisterUser(this.registerForm.value, this.userToUpdate)
  .subscribe(res=>{
    this.toastService.success({detail: "Success", summary: "Enquiry Updated", duration: 3000});
    this.registerForm.reset;
    this.router.navigate(['list']);
  })
  }

fillFormToUpdate(user: User) {
  this.registerForm.setValue({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    weight: user.weight,
    height: user.height,
    bmi: user.bmi,
    bmiResult: user.bmiResult,
    requireTrainer: user.requireTrainer,
    userGender: user.userGender,
    userPackage: user.userPackage,
    userGoals: user.userGoals,
    beenInGym: user.beenInGym,
    enquiryDate: user.enquiryDate
  })
}

submit() {
  this.api.postRegistredUser(this.registerForm.value)
  .subscribe(res=>{
    this.toastService.success({detail: "Success", summary: "Enquiry Added", duration: 3000});
    this.registerForm.reset;
  })
}

calculateBmi(heightValue: number) {

  const weight = this.registerForm.value.weight;
  const height = heightValue;
  const bmi = weight / (height * 2);
  this.registerForm.controls['bmi'].patchValue(bmi);

  switch (true) {
    case bmi < 18.5:
      this.registerForm.controls['bmiResult'].patchValue("Underweight");
      break;
    case bmi >= 18.5 && bmi < 25:
      this.registerForm.controls['bmiResult'].patchValue("Normal");
      break;
    case bmi >= 25 && bmi < 30:
      this.registerForm.controls['bmiResult'].patchValue("Overweight");
      break;
    default:
      this.registerForm.controls['bmiResult'].patchValue("Obese");
      break;
  }
}

}
