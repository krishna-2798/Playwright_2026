import {Page, Locator} from '@playwright/test';
import {ElementsUtil} from '../utils/ElementsUtil';
import { LoginPage } from './LoginPage';
import { ResultsPage } from './ResultsPage';

export class HomePage
{
    readonly page:Page;
    private readonly eleUtil:ElementsUtil;
    private readonly loginlink:Locator;
    private readonly logoutlink: Locator;
    private readonly search:Locator;
    private readonly searchicon:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.eleUtil=new ElementsUtil(page);
        this.loginlink=page.getByText("Login");
        this.logoutlink=page.getByRole('link',{name:'Logout'});
        this.search=page.getByPlaceholder("Search");
        this.searchicon=page.locator(".btn.btn-default.btn-lg");
        
    }

    async isUserloggedIn(): Promise<boolean>
    {
        return await this.eleUtil.isVisible(this.logoutlink, 0);
    }

    async isLogout(): Promise<LoginPage>
    {
        await this.eleUtil.click(this.logoutlink, {timeout:5000}, 1);
        await this.eleUtil.click(this.loginlink, {timeout:5000}, 1);
        return new LoginPage(this.page);
    }

    async searchItems(searchkey:string): Promise<ResultsPage>
    {
        console.log(`Search key is ${searchkey}`);
        await this.eleUtil.fill(this.search, searchkey);
        await this.eleUtil.click(this.searchicon);
        return new ResultsPage(this.page);
    }



}