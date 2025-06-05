import { IncomingData } from "../models/IncommingData";


export class CsvProcessor {
    static processCsvData(data?: string): string  {
        console.log(data);
        // Convert CSV string to an array of InputData
        var clinicianArray = JSON.parse(data!).map((c: IncomingData) =>
                      new IncomingData({
                        DateOfService: c.DateOfService,
                        Client: c.Client,
                        Clinician: c.Clinician,
                        BillingCode: c.BillingCode,
                        RatePerUnit: c.RatePerUnit,
                        Units: c.Units,
                        TotalFee: c.TotalFee,
                        ProgressNoteStatus: c.ProgressNoteStatus,
                        ClientPaymentStatus: c.ClientPaymentStatus,
                        Charge: c.Charge,
                        Uninvoiced: c.Uninvoiced,
                        Paid: c.Paid,
                        Unpaid: c.Unpaid
                      }));;
        
                clinicianArray = clinicianArray.slice(1);
        
        // Convert the array to CSV format
        return arrayToCsv(clinicianArray);
    }

}

function arrayToCsv(data: any[]): string {
    if (!data.length) return '';
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).map(value => `"${value}"`).join(','));
    return [headers, ...rows].join('\n');
}
