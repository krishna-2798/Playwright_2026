import{test as base, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

type MyFixtures={
    homepage:HomePage;
};

export const test=base.extend<MyFixtures>({
    homepage:async({page, baseURL}, use, testinfo) =>{
        let loginpage=new LoginPage(page);
        await loginpage.gotoLoginPage(baseURL);
        let username=testinfo.project.metadata.appusername;
        let passwd=testinfo.project.metadata.apppassword;
        const homepage=await loginpage.doLogin(username, passwd)
        expect(await homepage.isUserloggedIn()).toBeTruthy();

        await use(homepage);

    }
});

export{expect};