const ExcelJs = require("exceljs")

class ExcelUtils {

    // constructor(){

    // }

    async readFile(worksheet, searchText) {

        let output = { row: -1, column: -1 };
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                if (cell.value === searchText) {
                    output.row = rowNumber;
                    output.column = colNumber;
                }


            })

        })
        return output;

    }

    async writeExcelTest(searchText, replaceText, change, filePath) {
        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet('Sheet1');
        const output = await this.readFile(worksheet, searchText);
        const cell = worksheet.getCell(output.row, output.column + change.colChange);
        cell.value = replaceText;
        await workbook.xlsx.writeFile(filePath);
    }

}

module.exports = { ExcelUtils }



