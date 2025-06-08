export class OutgoingData {
    ClinicianFirstName!: string;
    ClinicianLastName!: string;
    ShowHours!: number;
    ShowHoursNoNotes!: number;
    LateNoShowHours!: number;
    GroupHours!: number;
    Notes: string = '';

    constructor(data: {
        ClinicianFirstName: string;
        ClinicianLastName: string;
        ShowHours: number;
        ShowHoursNoNotes: number;
        LateNoShowHours: number;
        GroupHours: number;
        Notes: string;
    }) {
        this.ClinicianFirstName = data.ClinicianFirstName;
        this.ClinicianLastName = data.ClinicianLastName;
        this.ShowHours = data.ShowHours;
        this.ShowHoursNoNotes = data.ShowHoursNoNotes;
        this.LateNoShowHours = data.LateNoShowHours;
        this.GroupHours = data.GroupHours;
        this.Notes = data.Notes;
    }
}