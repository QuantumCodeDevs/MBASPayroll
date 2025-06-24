import { EmploymentType } from "./enum/employmentType.enum";

//rename to clinician list
export class Clinician {
    name?: string;
    title?: string;
    mbasEmail?: string;
    personalNumber?: string;
    mbasClientContactNumber?: string;
    miscNumber?: string
    type?: EmploymentType;

    constructor(data: {
        name?: string;
        title?: string;
        mbasEmail?: string;
        personalNumber?: string;
        mbasClientContactNumber?: string;
        miscNumber?: string;
        type?: EmploymentType;
    }) {
        this.name = data.name;
        this.title = data.title;
        this.mbasEmail = data.mbasEmail;
        this.personalNumber = data.personalNumber;
        this.mbasClientContactNumber = data.mbasClientContactNumber;
        this.miscNumber = data.miscNumber;
        this.type = data.type;
    }
}
