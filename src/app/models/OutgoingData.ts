export class OutgoingData {
    ClinicianFirstName!: string;
    ClinicianLastName!: string;
    ShowHoursNotes!: number;
    ShowHoursNoNotes!: number;
    LateNoShowHoursPaid!: number;
    LateNoShowHoursUnPaid!: number;
    GroupHours!: number;
    TotalHours!: number;
    Notes: string = '';

    constructor(data: {
        ClinicianFirstName: string;
        ClinicianLastName: string;
        ShowHoursNotes: number;
        ShowHoursNoNotes: number;
        LateNoShowHoursPaid: number;
        LateNoShowHoursUnPaid: number;
        GroupHours: number;
        TotalHours: number;
        Notes: string;
    }) {
        this.ClinicianFirstName = data.ClinicianFirstName;
        this.ClinicianLastName = data.ClinicianLastName;
        this.ShowHoursNotes = data.ShowHoursNotes;
        this.ShowHoursNoNotes = data.ShowHoursNoNotes;
        this.LateNoShowHoursPaid = data.LateNoShowHoursPaid;
        this.LateNoShowHoursUnPaid = data.LateNoShowHoursUnPaid;
        this.GroupHours = data.GroupHours;
        this.TotalHours = data.TotalHours
        this.Notes = data.Notes;
    }
}