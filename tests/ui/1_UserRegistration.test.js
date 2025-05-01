import { test, expect } from '@playwright/test';
import { generateUniqueUsername } from '../../utils/userUtils';
import { userData } from '../../data/userData';
import fs from 'fs';
import path from 'path';

const testUserFile = path.resolve('tmp', 'testUser.json');
const username = generateUniqueUsername();

// ** Navigate to Para bank application. ** //
test('User Registration', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/register.htm');
  
// ** Create a new user from user registration page (Ensure username is generated randomly and it is unique in every test execution). ** //
// Register new user
  await page.fill("//input[@id='customer.firstName']", userData.firstName);
  await page.fill("//input[@id='customer.lastName']", userData.lastName);
  await page.fill("//input[@id='customer.address.street']", userData.address);
  await page.fill("//input[@id='customer.address.city']", userData.city);
  await page.fill("//input[@id='customer.address.state']", userData.state);
  await page.fill("//input[@id='customer.address.zipCode']", userData.zipCode);
  await page.fill("//input[@id='customer.phoneNumber']", userData.phone);
  await page.fill("//input[@id='customer.ssn']", userData.ssn);
  await page.fill("//input[@id='customer.username']", username);
  await page.fill("//input[@id='customer.password']", userData.password);
  await page.fill("//input[@id='repeatedPassword']", userData.password);
  await page.click("//td[@colspan='2']//input[@type='submit']");
  await expect(page.locator('.title')).toContainText('Welcome ' + username);

  // Save the username
  fs.writeFileSync(testUserFile, JSON.stringify({ username }));

});
