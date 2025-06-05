//Incoming CSV Clinician Model
class Clinician {
  constructor(DateOfService, Client, Clinician, BillingCode, RatePerUnit, Units, TotalFee, ProgressNoteStatus, ClientPaymentStatus, Charge, Uninvoiced, Paid, Unpaid) {
    this.DateOfService = DateOfService;
    this.Client = Client;
    this.Clinician = Clinician;
    this.BillingCode = BillingCode;
    this.RatePerUnit = RatePerUnit;
    this.Units = Units;
    this.TotalFee = TotalFee;
    this.ProgressNoteStatus = ProgressNoteStatus;
    this.ClientPaymentStatus = ClientPaymentStatus;
    this.Charge = Charge;
    this.Uninvoiced = Uninvoiced;
    this.Paid = Paid;
    this.Unpaid = Unpaid;
  }
}

module.exports = Clinician; // Export the class directly
