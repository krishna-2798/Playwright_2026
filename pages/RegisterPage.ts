import {Page, Locator} from '@playwright/test';
import { ElementsUtil } from '../utils/ElementsUtil';

export class RegisterPage{
    private readonly page: Page;
    private readonly eleUtil: ElementsUtil;
    private readonly first_name: Locator;
    private readonly last_name: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password:Locator;
    private readonly confirm_password:Locator;
    private readonly subscribeyes:Locator;
    private readonly subscribeno:Locator;
    private readonly checkbox:Locator;
    private readonly continueButton:Locator;
    private readonly successmsg:Locator;

constructor(page:Page)
{
    
    this.page = page;
    this.eleUtil = new ElementsUtil(page);
    this.first_name= page.locator("#input-firstname");
    this.last_name= page.locator("#input-lastname");
    this.email=page.locator("#input-email");
    this.telephone=page.locator("#input-telephone");
    this.password= page.locator("#input-password");
    this.confirm_password=page.locator("#input-confirm");
    this.subscribeyes = page.getByRole('radio',{name:'Yes'});
    this.subscribeno = page.getByRole('radio',{name:'No'});
    this.checkbox = page.locator("input[type='checkbox'][name='agree']");
    this.continueButton = page.getByRole('button',{name:'Continue'});
    this.successmsg=page.getByText('Your Account Has Been Created!', { exact: true });

}

async registerUser(
firstName: string,
lastName: string,
email: string,
tele_phone: string,
passwd: string,
subscribeNewsletter: string
): Promise<boolean>{

await this.eleUtil.fill(this.first_name, firstName);
await this.eleUtil.fill(this.last_name, lastName);
await this.eleUtil. fill(this.email, email);
await this.eleUtil.fill(this.telephone, tele_phone);
await this.eleUtil.fill(this.password, passwd);
await this.eleUtil.fill(this.confirm_password, passwd);


if (subscribeNewsletter.toLowerCase() === "yes") {
  await this.eleUtil.click(this.subscribeyes);
} else {
  await this.eleUtil.click(this.subscribeno);
}


await this.eleUtil.click(this.checkbox);
await this.eleUtil.click(this.continueButton);


return await this.eleUtil.isVisible(this.successmsg);
}


}