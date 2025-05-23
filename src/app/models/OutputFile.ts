import { OutgoingData } from "./OutgoingData";

export class OutputFile {
    FileName?: string;
    Data?: string;

    constructor(data: {
        FileName?: string;
        Data?: string;
    }) {
        this.FileName = data.FileName;
        this.Data = data.Data;
    }
}