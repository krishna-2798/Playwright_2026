import { Locator, Page } from '@playwright/test';
import { ElementsUtil } from '../utils/ElementsUtil';
import { HomePage } from './HomePage';
import { RegisterPage } from './RegisterPage';

export class LoginPage {
    private readonly page: Page;
    private readonly eleUtil: ElementsUtil;
    private readonly emailId: Locator;
    private readonly passwd: Locator;
    private readonly loginbtn: Locator;
    private readonly warnmsg: Locator;
    private readonly register:Locator;

    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementsUtil(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.passwd = page.getByRole('textbox', { name: 'Password' });
        this.loginbtn = page.getByRole('button', { name: 'Login' });
        this.warnmsg = page.locator('.alert.alert-danger.alert-dismissible');
        this.register=page.getByRole('link', {name:'Register'});
    }

async gotoLoginPage(baseURL:string |undefined)
{
    await this.page.goto(baseURL+'?route=account/login');
}

async doLogin(username: string, password: string): Promise<HomePage> {

    await this.eleUtil.fill(this.emailId, username);
    await this.eleUtil.fill(this.passwd, password);
    await this.eleUtil.click(this.loginbtn);
    return new HomePage(this.page);

}

async geterrormsg():Promise<string>
{
    const errormsg = await this.eleUtil.getText(this.warnmsg);
    console.log(`Error message is ${errormsg}`);
    return errormsg
}

async navigatetoregister():Promise<RegisterPage>
{
    await this.eleUtil.click(this.register);
    return new RegisterPage(this.page);
}

}