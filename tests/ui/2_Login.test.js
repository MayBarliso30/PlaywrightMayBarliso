import { test, expect } from '@playwright/test';
import { userData } from '../../data/userData';
import fs from 'fs';
import path from 'path';

const testUserFile = path.resolve('tmp', 'testUser.json');
const { username } = JSON.parse(fs.readFileSync(testUserFile));

// ** Login to the application with the user created in step 2. ** //
test('Login with newly registered user', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.fill("//input[@type='text']", username);
  await page.fill("//input[@type='password']", userData.password);
  await page.click("//input[@type='submit']");

  await expect(page.locator("//h1[contains(text(),'Accounts Overview')]")).toContainText('Accounts Overview');
});
