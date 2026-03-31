import{test, expect} from '@playwright/test'
import { request } from 'node:http'

test("fetch single post - id 12", async({request}) => {
const url="https://jsonplaceholder.typicode.com/posts/12"
const response = await request.get(url)
expect(response.status()).toBe(200)

const postData= await response.json()
console.log(postData)
expect(postData.id).toBe(12)
expect(postData.userId).toBe(2)

})