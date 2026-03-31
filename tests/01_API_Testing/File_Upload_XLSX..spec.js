import{test, expect} from '@playwright/test';
import { title } from 'node:process';
import XLSX from 'xlsx';

test("XLSX Payload Post", async ({request})=>{

    const workbook = XLSX.readFile('xlsxData.xlsx')
    const sheetName=workbook.sheetName[0]
    const sheet = workbook.sheet[sheetName]

    const records =XLSX.utils.sheet_to_json(sheet)

    for( const record of records){

        const payload ={
            id: Number(record.id),
            title: record.title,
            body:record.body,
            userId:Number(record.userId)
        }
    }
    const response = await request.post("https://jsonplaceholder.typicode.com/posts", {

        data: payload
    })
      })
    console.log(payload)
    console.log(response.status())
     expect(response.status()).toBe(201);
expect(responseData).toMatchObject(payload)
    
   

// expect(response.status()).toBe(201);