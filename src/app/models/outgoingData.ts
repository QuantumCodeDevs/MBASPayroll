export class OutgoingData {
    Clinician_FirstName!: string;
    Clinician_LastName!: string;

    Show_With_Notes_Hours!: number;
    Show_Without_Notes_Hours!: number;
    Late_NoShow_Paid_Hours!: number;
    Late_NoShow_UnPaid_Hours!: number;
    Group_Hours!: number;
    Note_Paid_Hours!: number;
    Total_Hours!: number;

    Notes: string = '';

    constructor(data: {
        ClinicianFirstName: string;
        ClinicianLastName: string;
        ShowWithNotesHours: number;
        ShowWithoutNotesHours: number;
        LateNoShowPaidHours: number;
        LateNoShowUnPaidHours: number;
        GroupHours: number;
        NotePaidHours: number;
        TotalHours: number;
        Notes: string;
    }) {
        this.Clinician_FirstName = data.ClinicianFirstName;
        this.Clinician_LastName = data.ClinicianLastName;
        this.Show_With_Notes_Hours = data.ShowWithNotesHours;
        this.Show_Without_Notes_Hours = data.ShowWithoutNotesHours;
        this.Late_NoShow_Paid_Hours = data.LateNoShowPaidHours;
        this.Late_NoShow_UnPaid_Hours = data.LateNoShowUnPaidHours;
        this.Group_Hours = data.GroupHours;
        this.Note_Paid_Hours = data.NotePaidHours
        this.Total_Hours = data.TotalHours;
        this.Notes = data.Notes;
    }
}