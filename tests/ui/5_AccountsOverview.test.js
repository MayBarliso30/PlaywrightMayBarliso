const { test, expect } = require('@playwright/test');
import { userData } from '../../data/userData';
import fs from 'fs';
import path from 'path';

const testUserFile = path.resolve('tmp', 'testUser.json');
const { username } = JSON.parse(fs.readFileSync(testUserFile));

// ** Validate if Accounts overview page is displaying the balance details as expected. ** //
test('Validate Account balance in Overview', async ({ page }) => {
// Login user
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.fill("//input[@type='text']", username);
  await page.fill("//input[@type='password']", userData.password);
  await page.click("//input[@type='submit']");
  
// Navigate to Accounts Overview Menu
  await expect(page.locator("//h1[contains(text(),'Accounts Overview')]")).toContainText('Accounts Overview');
  
// Verify display balance details
  const tableRows = page.locator("//th[contains(text(),'Balance*')]");
  await expect(tableRows.first()).toContainText('Balance');
});
