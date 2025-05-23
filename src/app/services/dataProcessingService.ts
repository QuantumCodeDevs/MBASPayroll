import { Clinician } from "../models/ExcelData";

const constants = {
    ApplicableStatuses: ["show", "no show", "late canceled"] // Example statuses
};

export class DataProcessingService {
    
    // static ProcessFile(data: any) {
    //     // Ensure data is an array
    //     if (!Array.isArray(data.data)) {
    //         console.error("Expected an array, but received:", typeof data);
    //         return [];
    //     }

    //     // Step 1: Filter data to only include applicable statuses
    //     const filteredData = data.data.filter((c: Clinician) =>
    //         constants.ApplicableStatuses.includes(c.Status.toLowerCase())
    //     );

    //     // Step 2: Group by Clinician_Name (assuming Clinician_Name exists)
    //     const groupedData = filteredData.reduce((acc: { [key: string]: Clinician[] }, clinician: Clinician) => {
    //         if (!acc[clinician.clinicianName]) {
    //             acc[clinician.clinicianName] = [];
    //         }
    //         acc[clinician.clinicianName].push(clinician);
    //         return acc;
    //     }, {});

    //     // Step 3: Map grouped data to Output[]
    //     const output: Output[] = Object.entries(groupedData).map(([clinicianName, group]) => {
    //         const typedGroup = group as Clinician[];
    //         const [firstName, lastName] = clinicianName.split(' ');
    //         return {
    //             ClinicianFirstName: firstName || '',
    //             ClinicianLastName: lastName || '',
    //             Hours: typedGroup.length, // Count occurrences as hours
    //         };
    //     });

    //     // // Step 4: Sort by last name
    //     // return output;
    //     output.sort((a, b) => (a.ClinicianLastName || "").localeCompare(b.ClinicianLastName || ""));
        
    //     console.log(output);

    //     return output;
    // }


    //Private Methods
    private ProcessList() {

    }


}