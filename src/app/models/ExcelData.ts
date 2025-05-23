export class ExcelData {
  ClientName: string | undefined;
  ClinicianName: string | undefined;
  DateOfService: Date | undefined;
  OfficeName: string | undefined;
  Status: string | undefined;

  constructor(data: {
    ClientName?: string;
    ClinicianName?: string;
    DateOfService?: string | Date;
    OfficeName?: string;
    Status?: string;
  }) {
    this.ClientName = data.ClientName;
    this.ClinicianName = data.ClinicianName;
    this.DateOfService = data.DateOfService ? new Date(data.DateOfService) : undefined;
    this.OfficeName = data.OfficeName;
    this.Status = data.Status;
  }
}
