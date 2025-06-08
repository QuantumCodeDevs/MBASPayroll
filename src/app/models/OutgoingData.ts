export class OutgoingData {
    ClinicianFirstName!: string;
    ClinicianLastName!: string;
    ShowHours!: number;
    ShowHoursNoNotes!: number;
    LateNoShowHours!: number;
    GroupHours!: number;
    TotalHours!: number; // This can be calculated if needed
    Notes: string = '';

    constructor(data: {
        ClinicianFirstName: string;
        ClinicianLastName: string;
        ShowHours: number;
        ShowHoursNoNotes: number;
        LateNoShowHours: number;
        GroupHours: number;
        TotalHours: number; // Optional, can be calculated later
        Notes: string;
    }) {
        this.ClinicianFirstName = data.ClinicianFirstName;
        this.ClinicianLastName = data.ClinicianLastName;
        this.ShowHours = data.ShowHours;
        this.ShowHoursNoNotes = data.ShowHoursNoNotes;
        this.LateNoShowHours = data.LateNoShowHours;
        this.GroupHours = data.GroupHours;
        this.TotalHours = data.TotalHours
        this.Notes = data.Notes;
    }
}