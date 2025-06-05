import { Employment } from "./enum/employment.enum";
//rename to clinician list
export class Employee {
    firstName: string | undefined;
    lastName: string | undefined;
    personalNumber: string | undefined;
    workNumber: string | undefined;
    type: Employment | undefined;
}