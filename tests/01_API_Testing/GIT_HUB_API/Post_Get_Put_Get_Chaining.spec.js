import{test,expect} from '@playwright/test';
import dotenv from 'dotenv';
import * as fs from "fs";


test.describe.serial('GitHub API Tests - Repository Operations', () => {
    let repoName;
    let updateDescription;
    const GITHUB_BASE_URL = process.env.GITHub_Base_Url;
    const GITHUB_TOKEN = process.env.GITHUB_Token;

    
    test.beforeAll(async ({ request }) => {
        const basePayload = JSON.parse(fs.readFileSync('files/GitHubPayload.json', 'utf-8'));
        const uniqueName = `${basePayload.name}-${Date.now()}`;
        const payload = { ...basePayload, name: uniqueName };
        
        const createResponse = await request.post(`${GITHUB_BASE_URL}/user/repos`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            data: payload
        });
        
        expect(createResponse.status()).toBe(201);
        const createBody = await createResponse.json();
        repoName = createBody.name;  
    });

    test('Verify repository was created', async ({ request }) => {
        const response = await request.get(`${GITHUB_BASE_URL}/repos/nileshbrahme/${repoName}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('name', repoName);
        expect(responseBody).toHaveProperty('private', false);
    });

    //Update the description of the created repository and validate the update
    test('Update repository description', async ({ request }) => {
        updateDescription = 'NewUpdated description';
        const updateResponse = await request.patch(`${GITHUB_BASE_URL}/repos/nileshbrahme/${repoName}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            data: {
                description: updateDescription
            }
        });
        expect(updateResponse.status()).toBe(200);
        const updateBody = await updateResponse.json();
        expect(updateBody).toHaveProperty('description', updateDescription);
    });

    test('Verify repository description update', async ({ request }) => {
        const response = await request.get(`${GITHUB_BASE_URL}/repos/nileshbrahme/${repoName}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        }); 
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('description', updateDescription);
    });

    test.afterAll(async ({ request }) => {
        // Cleanup: Delete the repository after all tests
        if (repoName) {
            await request.delete(`${GITHUB_BASE_URL}/repos/nileshbrahme/${repoName}`, {
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            console.log('Repository deleted:', repoName);
        }
    });
});