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
    dateOfService?: string;
    client?: string;
    clinician?: string;
    billingCode?: string;
    ratePerUnit?: string;
    units?: string;
    totalFee?: string;
    progressNoteStatus?: string;
    clientPaymentStatus?: string;
    charge?: string;
    uninvoiced?: string;
    paid?: string;
    unpaid?: string;
  }) {
    this.DateOfService = data.dateOfService ;
    this.Client = data.client;
    this.Clinician = data.clinician;
    this.BillingCode = data.billingCode;
    this.RatePerUnit = data.ratePerUnit;
    this.Units = data.units;
    this.TotalFee = data.totalFee;
    this.ProgressNoteStatus = data.progressNoteStatus;
    this.ClientPaymentStatus = data.clientPaymentStatus;
    this.Charge = data.charge;
    this.Uninvoiced = data.uninvoiced;
    this.Paid = data.paid;
    this.Unpaid = data.unpaid;
  }
}
