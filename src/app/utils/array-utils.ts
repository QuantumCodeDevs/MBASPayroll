

export class ArrayUtils {

    // This function maps the input data string to an array of Generic T objects
    static mapInputDataToArray<T>(data: string): T[] {
        try {
            const arr = JSON.parse(data!) as T[];
            // Remove spaces from all object keys in the array
            return arr.map(obj => {
                if (typeof obj !== 'object' || obj === null) return obj;
                const newObj: any = {};
                Object.keys(obj).forEach(key => {
                    const newKey = key.replace(/\s+/g, '');
                    newObj[newKey] = (obj as any)[key];
                });
                return newObj as T;
            });
        } catch (error) {
            console.error('Error mapping input data to array:', error);
            throw error; // Re-throw the error to be caught in the calling function
        }
    }

    // Converts an array of objects to a CSV formatted string
    static arrayToCsv(data: any[]): string {
        try {
            if (!data.length) return '';
            const headers = Object.keys(data[0]).join(',');
            const rows = data.map(row => Object.values(row).map(value => `"${value}"`).join(','));
            return [headers, ...rows].join('\n');
        } catch (error) {
            console.error('Error converting array to CSV:', error);
            throw error; // Re-throw the error to be caught in the calling function
        }
    }
}