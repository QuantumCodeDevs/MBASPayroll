import { EmploymentType } from "./enum/employmentType.enum";

//rename to clinician list
export class Clinician {
    firstName?: string;
    lastName?: string;
    title?: string;
    personalNumber?: string;
    workNumber?: string;
    type?: EmploymentType;
}