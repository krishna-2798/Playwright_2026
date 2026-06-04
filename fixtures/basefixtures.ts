import{test as base, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';

type MyFixtures={
    homepage:HomePage;
};

export const test=base.extend<MyFixtures>({
    homepage:async({page, baseURL}, use, testinfo) =>{
        const loginpage=new LoginPage(page);
        await loginpage.gotoLoginPage(baseURL);
        const username=testinfo.project.metadata.appUsername;
        const passwd=testinfo.project.metadata.appPassword;
        if (!username || !passwd) {
            throw new Error('Missing appUsername or appPassword metadata in Playwright config');
        }
        const homepage=await loginpage.doLogin(username, passwd);
        expect(await homepage.isUserloggedIn()).toBeTruthy();

        await use(homepage);

    }
});

export{expect};