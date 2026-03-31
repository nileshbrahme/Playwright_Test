import{test, expect} from '@playwright/test'

test("Patch Request", async ({request})=>{

    const url ="https://jsonplaceholder.typicode.com/posts/12"
    const putData ={
       
        title:"Patch Nilesh Patch"
        
    }
    const headers ={
        'Content-Type':'application/json; charset=UTF-8'
    }

    const response = await request.put(url, {
        data:putData,
        headers: headers
    })
    console.log(response.status())
expect(response.status()).toBe(200);

    const responseData = await response.json();
    console.log(responseData)
expect(responseData).toMatchObject(putData)

})

test("Partial Put ", async ({request})=>{

    const url ="https://jsonplaceholder.typicode.com/posts/12"
    const putData ={
        id:12,
        title:"Partial Nilesh Put"
    }
    const headers ={
        'Content-Type':'application/json; charset=UTF-8'
    }

    const response = await request.put(url, {
        data:putData,
        headers: headers
    })
    console.log(response.status())
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    console.log(responseData)

    expect(responseData.body).toBeUndefined()
    expect(responseData.userId).toBeUndefined()
    expect(responseData).toMatchObject(putData)

})

// expect(response.status()).toBe(201);