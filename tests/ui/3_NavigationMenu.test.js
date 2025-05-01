import { test, expect } from '@playwright/test';
import { userData } from '../../data/userData';
import fs from 'fs';
import path from 'path';

const testUserFile = path.resolve('tmp', 'testUser.json');
const { username } = JSON.parse(fs.readFileSync(testUserFile));

// ** Verify if the Global navigation menu in home page is working as expected. ** //
test('Global Navigation Menu Works', async ({ page }) => {
// Login user
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.fill("//input[@type='text']", username);
  await page.fill("//input[@type='password']", userData.password);
  await page.click("//input[@type='submit']");
  await expect(page.locator("//h1[contains(text(),'Accounts Overview')]")).toContainText('Accounts Overview');

  // Navigation Menu Links
  const links = [
    'Open New Account',
    'Accounts Overview',
    'Transfer Funds',
    'Bill Pay',
    'Find Transactions',
    'Update Contact Info',
    'Request Loan',
    'Log Out'
  ];

  for (const linkText of links) {
    await page.click(`text=${linkText}`);
    await expect(page).toHaveURL(/parabank\/.*\.htm/);
  }
});
