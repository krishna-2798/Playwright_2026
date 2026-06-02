import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
['html'],
['list'],
['allure-playwright'],
['playwright-html-reporter', {
testFolder: 'tests',
title: 'Naveen Automation Labs - Open Cart',
project: 'Open Cart',
release: '9.87.6',
testEnvironment: 'PROD',
embedAssets: true,
embedAttachments: true,
outputFolder: 'playwright-html-report',
minifyAssets: true,
startServer: true,
}]
],
  use: {
    actionTimeout: 0,
    navigationTimeout: 30 * 1000,
    baseURL: 'https://naveenautomationlabs.com/opencart/index.php',
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on',
  },

  metadata:{
    appusername:'abcds@gmail.com',
    apppassword:'123456789'
  },
  
  projects: [
    {
      name: 'chromium',
      use: {
            channel: 'chrome',
            viewport: null,
            launchOptions: {
            args: ['-start-maximized'],
            ignoreDefaultArgs: [' -- window-size=1280,720']
            }
        }
    },
    // {
    //   name: 'firefox',
    //   use: {
    //         browserName: 'firefox',
    //         viewport: { width: 1920, height: 1080 },
    //         launchOptions: {
    //         args: [],
    //         ignoreDefaultArgs: [' -- window-size=1280,720']
    //         }
    //     }
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
};

export default config;


