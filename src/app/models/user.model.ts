/** User Model */

export class User {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    phone!: number;
    weight!: number;
    height!: number;
    bmi!: number;
    bmiResult!: number;
    requireTrainer!: string;
    userGender!: string;
    userPackage!: string;
    userGoals!: string[];
    beenInGym!: string;
    enquiryDate!: string;
}