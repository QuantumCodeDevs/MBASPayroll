import { Employment } from "./enum/employment.enum";
//rename to clinician list
export class Employee {
    firstName?: string;
    lastName?: string;
    title?: string;
    personalNumber?: string;
    workNumber?: string;
    type?: Employment;
}