import{test, expect} from '@playwright/test';
import * as fs from "fs";
import {parse} from "csv-parse/sync"

test("Json Payload Post", async ({request})=>{

    const url ="https://jsonplaceholder.typicode.com/posts"
    const filepath="files\csvdata.csv"
    const csvcontent = (fs.readFileSync(filepath,"utf-8"))
    const records = parse(csvcontent,{
columns:true,
skip_empty_lines:true
    })
    console.log(records)
    const newPostPayload = records[0]
    const response = await request.post(url, {
        data:newPostPayload
    })
    console.log(response.status())
    const responseData = await response.json()
    console.log(responseData)
    
    expect(response.status()).toBe(201);
expect(responseData).toMatchObject(newPostPayload)
})

// expect(response.status()).toBe(201);