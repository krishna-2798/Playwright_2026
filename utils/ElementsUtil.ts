import { Locator, Page, expect, type Locator as LocatorType } from '@playwright/test';

export type Selector = string | Locator;

export class ElementsUtil {
  [x: string]: any;
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private resolveLocator(selector: Selector): Locator {
    if (typeof selector === 'string') {
      return this.page.locator(selector);
    }
    return selector;
  }

  async click(selector: Selector, options?: Parameters<Locator['click']>[0], index?: number): Promise<void> {
    let locator = this.resolveLocator(selector);
    if (typeof index === 'number') {
      locator = locator.nth(index);
    } else {
      locator = locator.first();
    }
    await locator.waitFor({ state: 'visible' });
    await locator.click(options);
  }

  async type(selector: Selector, text: string, options?: Parameters<Locator['fill']>[1]): Promise<void> {
    const locator = this.resolveLocator(selector);
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text, options);
  }

  async clearAndType(selector: Selector, text: string): Promise<void> {
    const locator = this.resolveLocator(selector);
    await locator.waitFor({ state: 'visible' });
    await locator.fill('');
    await locator.fill(text);
  }

  async fill(selector: Selector, text: string, options?: Parameters<Locator['fill']>[1]): Promise<void> {
    const locator = this.resolveLocator(selector);
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text, options);
  }

  async hover(selector: Selector, options?: Parameters<Locator['hover']>[0]): Promise<void> {
    const locator = this.resolveLocator(selector);
    await locator.waitFor({ state: 'visible' });
    await locator.hover(options);
  }

  async isVisible(selector: Selector, index?: number): Promise<boolean> {
    let locator = this.resolveLocator(selector);
    if (typeof index === 'number') {
      locator = locator.nth(index);
    }
    return await locator.isVisible();
  }

  async isEnabled(selector: Selector): Promise<boolean> {
    const locator = this.resolveLocator(selector);
    return await locator.isEnabled();
  }

  async getText(selector: Selector): Promise<string> {
    const locator = this.resolveLocator(selector);
    await locator.waitFor({ state: 'visible' });
    return await locator.textContent() ?? '';
  }

  async getValue(selector: Selector): Promise<string> {
    const locator = this.resolveLocator(selector);
    await locator.waitFor({ state: 'visible' });
    return (await locator.inputValue()) ?? '';
  }

  async getAttribute(selector: Selector, attributeName: string): Promise<string | null> {
    const locator = this.resolveLocator(selector);
    await locator.waitFor({ state: 'attached' });
    return await locator.getAttribute(attributeName);
  }

  async waitForVisible(selector: Selector, timeout = 5000): Promise<void> {
    const locator = this.resolveLocator(selector);
    await locator.first().waitFor({ state: 'visible', timeout });
  }

  async waitForHidden(selector: Selector, timeout = 5000): Promise<void> {
    const locator = this.resolveLocator(selector);
    await locator.first().waitFor({ state: 'hidden', timeout });
  }

  async waitForElementVisible(selector: Selector, timeout = 5000): Promise<void> {
    const locator = this.resolveLocator(selector);
    await locator.first().waitFor({ state: 'visible', timeout });
  }

  async getInnerTexts(selector: Selector): Promise<string> {
    const locator = this.resolveLocator(selector);
    await locator.waitFor({ state: 'visible' });
    return await locator.innerText();
  }

  async getAllInnerTexts(selector: Selector): Promise<string[]> {
    const locator = this.resolveLocator(selector);
    await locator.first().waitFor({ state: 'visible' });
    return await locator.allInnerTexts();
  }

  async expectText(selector: Selector, expectedText: string): Promise<void> {
    const locator = this.resolveLocator(selector);
    await expect(locator).toHaveText(expectedText);
  }

  async expectValue(selector: Selector, expectedValue: string): Promise<void> {
    const locator = this.resolveLocator(selector);
    await expect(locator).toHaveValue(expectedValue);
  }

  async login(
    username: string,
    password: string,
    usernameField: Selector,
    passwordField: Selector,
    submitButton: Selector,
    options?: {
      usernameClear?: boolean;
      passwordClear?: boolean;
      waitForNavigation?: boolean;
    }
  ): Promise<void> {
    if (options?.usernameClear !== false) {
      await this.clearAndType(usernameField, username);
    } else {
      await this.type(usernameField, username);
    }

    if (options?.passwordClear !== false) {
      await this.clearAndType(passwordField, password);
    } else {
      await this.type(passwordField, password);
    }

    await this.click(submitButton);
    if (options?.waitForNavigation) {
      await this.page.waitForLoadState('networkidle');
    }
  }

  async selectOption(selector: Selector, value: string | string[]): Promise<void> {
    const locator = this.resolveLocator(selector);
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption(value);
  }

  async check(selector: Selector): Promise<void> {
    const locator = this.resolveLocator(selector);
    await locator.waitFor({ state: 'visible' });
    if (!(await locator.isChecked())) {
      await locator.check();
    }
  }

  async uncheck(selector: Selector): Promise<void> {
    const locator = this.resolveLocator(selector);
    await locator.waitFor({ state: 'visible' });
    if (await locator.isChecked()) {
      await locator.uncheck();
    }
  }
}
