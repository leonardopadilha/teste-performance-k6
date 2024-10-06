import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch({ headless: false });
  const page = browser.newPage();
 
  try {
    await page.goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' });

    // Enter login credentials
    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');
    
    await Promise.all([
      page.waitForNavigation(),
      page.click('input[type="submit"]'),
    ]);

    await Promise.all([
      page.waitForNavigation(),
      page.click('input[value="Logout"]'),
    ]);

    // Navigate to Home page
    await page.goto(`https://test.k6.io/`, { waitUntil: 'load' });    
    page.screenshot({ path: 'screenshot.png' });
  } finally {
    page.close();
    browser.close();
  }
}