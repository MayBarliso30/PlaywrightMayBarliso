const { test, expect } = require('@playwright/test');
import { userData } from '../../data/userData';
import fs from 'fs';
import path from 'path';

const testUserFile = path.resolve('tmp', 'testUser.json');
const { username } = JSON.parse(fs.readFileSync(testUserFile));

// ** Create a Savings account from “Open New Account Page” and capture the account number. ** //
test('Create a new Savings account', async ({ page }) => {
// Login user
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.fill("//input[@type='text']", username);
  await page.fill("//input[@type='password']", userData.password);
  await page.click("//input[@type='submit']");
  await expect(page.locator("//h1[contains(text(),'Accounts Overview')]")).toContainText('Accounts Overview');

// Navigate to Open New Account Menu
  await page.click("//a[contains(text(),'Open New Account')]");
  await expect(page.locator("//h1[contains(text(),'Open New Account')]")).toHaveText('Open New Account');

// Select 'Savings' dropdown
  await expect(page.locator("//select[@id='type']")).toBeVisible();
  await page.selectOption("//select[@id='type']", { label: 'SAVINGS' });

// Submit
  await page.click("//input[@type='button']");
  await expect(page.locator("//h1[contains(text(),'Account Opened!')]")).toHaveText('Account Opened!');

// ** Capture the account number ** //
const accountId = await page.locator("//a[@id='newAccountId']").innerText();
console.log('Account ID: ', accountId);
});
