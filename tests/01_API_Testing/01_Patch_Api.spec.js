import{test, expect} from '@playwright/test'



test("Patch Put ", async ({request})=>{

    const url ="https://jsonplaceholder.typicode.com/posts/12"
    const partialData ={
        title:"Patch Nilesh Put"
    }
    const headers ={
        'Content-Type':'application/json; charset=UTF-8'
    }

    const response = await request.patch(url, {
        data:partialData,
        headers: headers
    })
    console.log(response.status())
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    console.log(responseData)
expect(responseData.title).toBe(partialData.title)
    expect(responseData.body).toBeTruthy()
    expect(responseData.userId).toBe(2)
    expect(responseData.id).toBe(12)

})

// expect(response.status()).toBe(201);