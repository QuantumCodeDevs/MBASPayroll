import { OutgoingData } from "./outgoingData";

export class OutputFile {
    FileName!: string;
    Data!: any; // This can be a string or an array depending on the format

    constructor(data: {
        FileName: string;
        Data: any;
    }) {
        this.FileName = data.FileName;
        this.Data = data.Data;
    }
}