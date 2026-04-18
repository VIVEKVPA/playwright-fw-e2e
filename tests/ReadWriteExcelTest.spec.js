import { test } from '@playwright/test'
import ExcelJS from 'exceljs'

async function readExcel(worksheet, searchText){
    let output = {row:-1, column:-1}
    worksheet.eachRow((row, rowNum) => {
        row.eachCell((cell, colNum) => {
            if (cell.value === searchText) {
                output.row = rowNum
                output.column = colNum
            }
        })
    })
    return output
}

async function writeExcel(searchText, replaceText, filePath) {
    
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1')
    const output = await readExcel(worksheet,searchText)

    const cell = worksheet.getCell(output.row, output.column)
    cell.value == replaceText

    await workbook.xlsx.writeFile(filePath)
}

async function writeExcel_Price(searchText, replaceText, change, filePath) {
    
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1')
    const output = await readExcel(worksheet,searchText)

    const cell = worksheet.getCell(output.row, output.column+change.colChange)
    cell.value == replaceText

    await workbook.xlsx.writeFile(filePath)
}
test('Read Wriet excel data', async () => {

    await writeExcel('Banana', 'Shake', 'C:/Users/SANexGenUser/Downloads/download.xlsx')

    //Update Mango price to 349
    await writeExcel_Price('Mango', '349', {rowChange:0, colChange:2},'C:/Users/SANexGenUser/Downloads/download.xlsx')

})


// workbook.xlsx.readFile('C:/Users/SANexGenUser/Downloads/download.xlsx').then(() => {
    //     const worksheet = workbook.getWorksheet('Sheet1')
    //     worksheet.eachRow((row, rowNumber) => {
    //         row.eachCell((cell, colNumber) => {
    //             console.log(cell.value)
    //         })
    //     })
    // })