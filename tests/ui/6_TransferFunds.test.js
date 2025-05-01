const { test, expect } = require('@playwright/test');
import { userData } from '../../data/userData';
import fs from 'fs';
import path from 'path';

const testUserFile = path.resolve('tmp', 'testUser.json');
const { username } = JSON.parse(fs.readFileSync(testUserFile));

// ** Transfer funds from account created in step 5 to another account. ** //
test('Validate transfer to another account', async ({ page }) => {
// Login user
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.fill("//input[@type='text']", username);
  await page.fill("//input[@type='password']", userData.password);
  await page.click("//input[@type='submit']");

  // Navigate to Transfer Funds Menu
  await page.click("//a[contains(text(),'Transfer Funds')]");
  await expect(page.locator("//h1[contains(text(),'Transfer Funds')]")).toContainText('Transfer Funds');

  // Input 500 to transfer to another account
  await page.fill("//input[@id='amount']", '500');
  
  // Wait for dropdown options to load
  await page.waitForSelector("//select[@id='fromAccountId']");
  await page.waitForSelector("//select[@id='toAccountId']");

  // Get dropdown option values
  const fromAccountValue = await page.locator("//select[@id='fromAccountId']").first().getAttribute('value');
  const toAccountOption = page.locator("//select[@id='toAccountId']").nth(1);
  const toAccountValue = await toAccountOption.count() ? await toAccountOption.getAttribute('value') : fromAccountValue;

  console.log('From account: ', fromAccountValue);
  console.log('To account:' , toAccountValue);

  // Select from/to accounts
  await page.selectOption("//select[@id='fromAccountId']", fromAccountValue);
  await page.selectOption("//select[@id='toAccountId']", toAccountValue);

  await page.click("//input[@type='submit']");

  await expect(page.locator('#rightPanel')).toContainText('Transfer Complete!');

});