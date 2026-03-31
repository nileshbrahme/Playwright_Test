import{test,expect} from '@playwright/test';
import dotenv from 'dotenv';
import * as fs from "fs";


test.describe.serial('GitHub API Tests - Create Repository', () => {

    let RepoName;
    const GITHUB_BASE_URL = process.env.GITHub_Base_Url;
    const GITHUB_TOKEN = process.env.GITHUB_Token;


    test('Create a new repository', async ({ request }) => { 
        const basePayload = JSON.parse(fs.readFileSync('files/GitHubPayload.json', 'utf-8'));
        const uniqueName = `${basePayload.name}-${Date.now()}`;
        const payload = { ...basePayload, name: uniqueName };
        const response = await request.post(`${GITHUB_BASE_URL}/user/repos`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            data: payload
        });
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        RepoName = responseBody.name;
        expect(responseBody).toHaveProperty('name', payload.name);
        expect(responseBody).toHaveProperty('private', payload.private);
        console.log('Create Repo Response Body:', responseBody);
        
    });


    test('Get the created repository details', async ({ request }) => {
        const response = await request.get(`${GITHUB_BASE_URL}/repos/nileshbrahme/${RepoName}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }   
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('name', RepoName);
        expect(responseBody).toHaveProperty('private', false);
        console.log('Get Repo Response Body:', responseBody);
    });

}); 

