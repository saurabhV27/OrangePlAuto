const{test,expect} = require('@playwright/test');
const ExcelJS = require('exceljs');

test('upload and download a file',async({page})=>{

    const filepath = '/Users/saurabhvalunjkar/Downloads/download.xlsx';
    let cellValue = 'Mango';
    let updatedValue = '351';
    let change = {rowchange:0,colChange:2};

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
   
    const downloadPromise = page.waitForEvent('download');   
    await page.getByRole('button',{name: 'Download'}).click();

    const download = await downloadPromise;
    await download.saveAs('/Users/saurabhvalunjkar/Downloads/' + download.suggestedFilename());
    
    //await page.pause();

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filepath);
    const sheet = workbook.getWorksheet('Sheet1');
    const output = await ExcelRead(cellValue,sheet);
    if(output.row && output.column){
    const cellBox = sheet.getCell(output.row,output.column+change.colChange);
    cellBox.value = updatedValue;
    await workbook.xlsx.writeFile(filepath);
    }
    else
        console.log("No values received");

    console.log(output);


    await page.locator('#fileinput').setInputFiles(filepath);

    const rowUpdate = page.getByText(cellValue);
    const desiredValue = await page.getByRole('row').filter({hasText : cellValue});
    await expect(desiredValue.locator('#cell-4-undefined')).toContainText(updatedValue);
    //await page.pause();

});

async function ExcelRead(cellValue,Sheet){

    let output = {row:null,column:null};

    Sheet.eachRow((row,rowNumber)=>{
        row.eachCell((cell,colNumber)=>{
            if(cell.value==cellValue)
            {
                output.row = rowNumber;
                output.column = colNumber;
                console.log(output.row,output.column);
                
            }
        });
        
    });
    return output;

}
