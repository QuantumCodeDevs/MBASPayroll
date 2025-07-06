export class OutgoingData {
    clinicianFirstName!: string;
    clinicianLastName!: string;
    showWithNotesHours!: number;
    showWithoutNotesHours!: number;
    lateNoShowPaidHours!: number;
    lateNoShowUnPaidHours!: number;
    groupHours!: number;
    notePaidHours!: number;
    totalHours!: number;
    medicaidHours!: number;
    notes: string = '';

    constructor(data: {
        clinicianFirstName: string;
        clinicianLastName: string;
        showWithNotesHours: number;
        showWithoutNotesHours: number;
        lateNoShowPaidHours: number;
        lateNoShowUnPaidHours: number;
        groupHours: number;
        notePaidHours: number;
        totalHours: number;
        medicaidHours: number;
        notes: string;
    }) {
        this.clinicianFirstName = data.clinicianFirstName;
        this.clinicianLastName = data.clinicianLastName;
        this.showWithNotesHours = data.showWithNotesHours;
        this.showWithoutNotesHours = data.showWithoutNotesHours;
        this.lateNoShowPaidHours = data.lateNoShowPaidHours;
        this.lateNoShowUnPaidHours = data.lateNoShowUnPaidHours;
        this.groupHours = data.groupHours;
        this.notePaidHours = data.notePaidHours;
        this.totalHours = data.totalHours;
        this.medicaidHours = data.medicaidHours;
        this.notes = data.notes;
    }
}