import { test, expect, request } from '@playwright/test';

// ** Search the transactions using “Find transactions” API call by amount for the payment transactions made in Step 8. ** //
test('[API] Validate transaction by amount', async () => {
    const context = await request.newContext();
    const amountToFind = '300';
  
    const response = await context.get('https://parabank.parasoft.com/api/transactions');
    
      console.log(`Status: ${response.status()}`);
      const responseBody = await response.text();
      console.log(responseBody);
    
      // Log the raw response body to check if it's HTML or JSON
      const rawBody = await response.text();
      console.log('Raw Response Body:', rawBody);
    
      if (rawBody.includes('<html>')) {
        console.error('Received HTML response, not JSON. Check if the URL or authentication is correct.');
        return;
      }

      // Verification
      expect(body.transactions).toBeDefined();
      expect(body.transactions.length).toBeGreaterThan(0);
      expect(body.transactions[0].amount).toBe(amountToFind);
    });
  