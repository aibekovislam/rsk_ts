import { utils, writeFile } from 'xlsx';
import { saveAs } from 'file-saver';

const transformDataForExcel = (data) => {
    // Assuming the server response is an array of objects with key-value pairs
    // If the data is not in this format, you'll need to adjust the transformation accordingly
    return data.map((item) => ({
      Column1: item.property1,
      Column2: item.property2,
      // Add more columns based on the properties you have in your data
    }));
  };
  
export const exportToExcel = (data) => {
    const transformedData = transformDataForExcel(data);
  
    const XLSX = require('xlsx');
    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
  
    const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(fileData, 'report.xlsx');
  };
  

