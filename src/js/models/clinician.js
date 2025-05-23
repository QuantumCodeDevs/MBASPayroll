// src/models/clinician.js
class Clinician {
  constructor(ClientName, ClinicianName, DateOfService, OfficeName, Status) {
    this.ClientName = ClientName;
    this.ClinicianName = ClinicianName;
    this.DateOfService = DateOfService;
    this.OfficeName = OfficeName;
    this.Status = Status;
  }
}

module.exports = Clinician; // Export the class directly
