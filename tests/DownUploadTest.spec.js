import { test, expect } from '@playwright/test'
import ExcelJS from 'exceljs'

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 }
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

async function writeExcel_Price(searchText, replaceText, change, filePath) {

    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1')
    const output = await readExcel(worksheet, searchText)

    const cell = worksheet.getCell(output.row, output.column + change.colChange)
    cell.value = replaceText
    await workbook.xlsx.writeFile(filePath)
}
test('Download manipulate upload excel data', async ({ page }) => {

    let searchText = 'Mango'
    let replaceText = '454'
    await page.goto('https://rahulshettyacademy.com/upload-download-test/', { waitUntil: 'networkidle' })
    const downloadPro = page.waitForEvent("download")
    await page.getByRole('button', { name: 'Download' }).click()
    const downloaded = await downloadPro
    const filePath = './downloads/' + downloaded.suggestedFilename()
    await downloaded.saveAs(filePath)
    //Update Mango price to xxxx
    await writeExcel_Price(searchText, replaceText, { rowChange: 0, colChange: 2 }, filePath)
    const uploadBtn = page.locator('#fileinput')
    await uploadBtn.setInputFiles(filePath)
    await expect(page.getByText(replaceText)).toBeVisible()

    const searchedTextCell = page.getByText(searchText)
    const searchedTextRow = page.getByRole('row').filter({has: searchedTextCell})
    const replacedTextCell = searchedTextRow.locator('#cell-4-undefined')
    await expect(replacedTextCell).toHaveText(replaceText)

})


// workbook.xlsx.readFile('C:/Users/SANexGenUser/Downloads/download.xlsx').then(() => {
//     const worksheet = workbook.getWorksheet('Sheet1')
//     worksheet.eachRow((row, rowNumber) => {
//         row.eachCell((cell, colNumber) => {
//             console.log(cell.value)
//         })
//     })
// })