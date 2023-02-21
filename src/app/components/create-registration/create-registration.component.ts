import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

constructor(private fb: FormBuilder) {

}

ngOnInit(): void {
  
  this.registerForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    phone: [''],
    weight: [''],
    height: [''],
    requireTrainer: [''],
    userGender: [''],
    userPackage: [''],
    userGoals: [''],
    beenInGym: [''],
    enquiryDate: ['']
  })

}

submit() {
  console.log(this.registerForm.value);
}

}
