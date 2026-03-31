import{test, expect} from '@playwright/test';
import * as fs from "fs";

test("Json Payload Post", async ({request})=>{

    const url ="https://jsonplaceholder.typicode.com/posts"
    const filepath="files\jsonData.json"
    const newPostPayload = JSON.parse(fs.readFileSync(filepath,"utf-8"))
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