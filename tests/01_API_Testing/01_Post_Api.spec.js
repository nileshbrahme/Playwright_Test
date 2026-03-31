import{test, expect} from '@playwright/test'

test("Post Single ID", async ({request})=>{

    const url ="https://jsonplaceholder.typicode.com/posts"
    const postData ={
        title:"Nilesh Post 105",
        body:"Nilesh Body Post1",
        userId: 12
    }
    const response = await request.post(url, {data:postData})
    console.log(response.status())
    const responseData = await response.json()
    console.log(responseData)
    
    expect(response.status()).toBe(201);
expect(responseData).toMatchObject(postData)
})

// expect(response.status()).toBe(201);