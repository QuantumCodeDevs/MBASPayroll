import { Employment } from "./enum/employment.enum";

export class Employee {
    firstName: string | undefined;
    lastName: string | undefined;
    type: Employment | undefined;
}