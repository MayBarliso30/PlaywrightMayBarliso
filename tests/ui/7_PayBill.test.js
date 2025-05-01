const { test, expect } = require('@playwright/test');
import { userData } from '../../data/userData';
import fs from 'fs';
import path from 'path';

const testUserFile = path.resolve('tmp', 'testUser.json');
const { username } = JSON.parse(fs.readFileSync(testUserFile));

// ** Pay the bill with account created in step 5. ** //
test('Validate Pay Bill', async ({ page }) => {
// Login user
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.fill("//input[@type='text']", username);
  await page.fill("//input[@type='password']", userData.password);
  await page.click("//input[@type='submit']");

   // Navigate to Bill Pay Menu
  await page.click("//a[contains(text(),'Bill Pay')]");
  await expect(page.locator("//h1[contains(text(),'Bill Payment Service')]")).toContainText('Bill Payment Service');

  // Enter payee information
  await page.fill('input[name="payee.name"]', 'Insurance Company');
  await page.fill('input[name="payee.address.street"]', '3136 Central Park');
  await page.fill('input[name="payee.address.city"]', 'Makati City');
  await page.fill('input[name="payee.address.state"]', 'Manila');
  await page.fill('input[name="payee.address.zipCode"]', '3001');
  await page.fill('input[name="payee.phoneNumber"]', '0987654321');
  await page.fill('input[name="payee.accountNumber"]', '12345');
  await page.fill('input[name="verifyAccount"]', '12345');
  await page.fill('input[name="amount"]', '300');
  await page.selectOption('select[name="fromAccountId"]', { index: 0 });
  await page.click("//input[@type='button']");

  // Verify Bill Payment Complete
  await expect(page.locator("//h1[contains(text(),'Bill Payment Complete')]")).toContainText('Bill Payment Complete');
});