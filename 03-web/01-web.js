import { browser } from 'k6/experimental/browser';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    ui: {
      executor: 'constant-vus',
      vus: 3,
      duration: '10s',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' });

    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');

    const submitButton = page.locator('input[type="submit"]');

    await Promise.all([submitButton.click(), page.waitForNavigation()]);

    check(page, {
        header: (p) => p.locator('h2').textContent() == 'Welcome, admin!',
    });

    sleep(1)
  } finally {
    page.close();
  }
}


//para executar => K6_BROWSER_HEADLESS=false k6 run 01-web.js ou K6_BROWSER_HEADLESS="false" k6 run 01-web