import{test,expect} from '@playwright/test';
import dotenv from 'dotenv';
    
test.describe('GitHub API Tests', () => {   

const GITHUB_BASE_URL = process.env.GITHub_Base_Url;

    test('Get user details', async ({ request }) => {
        const response = await request.get(`${GITHUB_BASE_URL}/users/octocat`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('login', 'octocat');
        expect(responseBody).toHaveProperty('id');
        expect(responseBody).toHaveProperty('node_id');
        expect(responseBody).toHaveProperty('avatar_url');
        expect(responseBody).toHaveProperty('gravatar_id');
        expect(responseBody).toHaveProperty('url');
        expect(responseBody).toHaveProperty('html_url');
        expect(responseBody).toHaveProperty('user_view_type', 'public');
            console.log('Response Body:', responseBody);
    });


    test('Get user repositories', async ({ request }) => {
        const response = await request.get(`${GITHUB_BASE_URL}/users/octocat/repos`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody[0]).toHaveProperty('name');
        expect(responseBody[0]).toHaveProperty('full_name');
        expect(responseBody[0]).toHaveProperty('private', false);
        expect(responseBody[0].owner).toHaveProperty('login');
        expect(responseBody[1].owner).toHaveProperty('id');
        console.log('Response Body:', responseBody);
})


    test('Get repository details', async ({ request }) => {
        const response = await request.get(`${GITHUB_BASE_URL}/repos/octocat/Hello-World`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('name', 'Hello-World');
        expect(responseBody).toHaveProperty('owner.login');
        expect(responseBody).toHaveProperty('private', false);
        expect(responseBody).toHaveProperty('html_url', 'https://github.com/octocat/Hello-World');
        console.log('Response Body:', responseBody);
    });


    test('Get repository issues', async ({ request }) => {
        const response = await request.get(`${GITHUB_BASE_URL}/repos/octocat/Hello-World/issues`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody[0]).toHaveProperty('id');
        expect(responseBody[0].user).toHaveProperty('user_view_type', 'public');

        console.log('Response Body:', responseBody);
    })


    test('Get repository commits', async ({ request }) => {
        const response = await request.get(`${GITHUB_BASE_URL}/repos/octocat/Hello-World/commits`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody[0].commit).toHaveProperty('message');
        expect(responseBody[0].commit).toHaveProperty('author.name');
        expect(responseBody[0].commit).toHaveProperty('author.email');

        console.log('Response Body:', responseBody);
    });

    test('Get repository branches', async ({ request }) => {
        const response = await request.get(`${GITHUB_BASE_URL}/repos/octocat/Hello-World/branches`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody[0]).toHaveProperty('name', 'master');
        expect(responseBody[0].commit).toHaveProperty('commit.author.name');
        expect(responseBody[0].commit).toHaveProperty('commit.author.email');

        console.log('Response Body:', responseBody);
    });


    //negative test cases from above API endpoints with invalid user and repository names
    test('Get user details with invalid username', async ({ request }) => {
        const response = await request.get(`${GITHUB_BASE_URL}/users/invalidusername123`);
        expect(response.status()).toBe(404);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message', 'Not Found');
        console.log('Response Body:', responseBody);
    });


    test('Get repository details with invalid repository name', async ({ request }) => {
        const response = await request.get(`${GITHUB_BASE_URL}/repos/octocat/invalid-repo-name-123`);
        expect(response.status()).toBe(404);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message', 'Not Found');
        console.log('Response Body:', responseBody);
    });


    test('Get repository issues with invalid repository name', async ({ request }) => {
            const response = await request.get(`${GITHUB_BASE_URL}/repos/octocat/invalid-repo-name-123/issues`);
            expect(response.status()).toBe(404);
            const responseBody = await response.json();
            expect(responseBody).toHaveProperty('message', 'Not Found');
            console.log('Response Body:', responseBody);
     });


    test('Get repository commits with invalid repository name', async ({ request }) => {
            const response = await request.get(`${GITHUB_BASE_URL}/repos/octocat/invalid-repo-name-123/commits`);
            expect(response.status()).toBe(404);
            const responseBody = await response.json();
            expect(responseBody).toHaveProperty('message', 'Not Found');
            console.log('Response Body:', responseBody);

    });


    test('Get repository branches with invalid repository name', async ({ request }) => {
            const response = await request.get(`${GITHUB_BASE_URL}/repos/octocat/invalid-repo-name-123/branches`);
            expect(response.status()).toBe(404);
            const responseBody = await response.json();
            expect(responseBody).toHaveProperty('message', 'Not Found');
            console.log('Response Body:', responseBody);
    });


});
