export class IncomingData {
  DateOfService?: string;
  Client?: string;
  Clinician?: string;
  BillingCode?: string;
  RatePerUnit?: string;
  Units?: string;
  TotalFee?: string;
  ProgressNoteStatus?: string;
  ClientPaymentStatus?: string;
  Charge?: string;
  Uninvoiced?: string;
  Paid?: string;
  Unpaid?: string;

  constructor(data: {
    DateOfService?: string;
    Client?: string;
    Clinician?: string;
    BillingCode?: string;
    RatePerUnit?: string;
    Units?: string;
    TotalFee?: string;
    ProgressNoteStatus?: string;
    ClientPaymentStatus?: string;
    Charge?: string;
    Uninvoiced?: string;
    Paid?: string;
    Unpaid?: string;
  }) {
    this.DateOfService = data.DateOfService ;
    this.Client = data.Client;
    this.Clinician = data.Clinician;
    this.BillingCode = data.BillingCode;
    this.RatePerUnit = data.RatePerUnit;
    this.Units = data.Units;
    this.TotalFee = data.TotalFee;
    this.ProgressNoteStatus = data.ProgressNoteStatus;
    this.ClientPaymentStatus = data.ClientPaymentStatus;
    this.Charge = data.Charge;
    this.Uninvoiced = data.Uninvoiced;
    this.Paid = data.Paid;
    this.Unpaid = data.Unpaid;
  }
}
