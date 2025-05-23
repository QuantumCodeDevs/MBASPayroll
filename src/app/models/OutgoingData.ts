export class OutgoingData {
    ClinicianFirstName?: string;
    ClinicianLastName?: string;
    IsGroup?: boolean;
    ShowHours?: number;
    LateNoShowHours?: number;
    Notes?: string;

    constructor(data: {
        ClinicianFirstName?: string;
        ClinicianLastName?: string;
        IsGroup?: boolean;
        ShowHours?: number;
        LateNoShowHours?: number;
        Notes?: string;
    }) {
        this.ClinicianFirstName = data.ClinicianFirstName;
        this.ClinicianLastName = data.ClinicianLastName;
        this.IsGroup = data.IsGroup;
        this.ShowHours = data.ShowHours;
        this.LateNoShowHours = data.LateNoShowHours;
        this.Notes = data.Notes;
    }
}