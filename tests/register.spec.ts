import { LoginPage } from '../pages/LoginPage.js';
import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage.js';
import fs from 'fs';
import { parse } from 'csv-parse/sync';


//schema/type of reg data fields
type RegData ={
firstName: string,
lastName: string,
email: string,
tele_phone: string,
passwd: string,
subscribeNewsletter: string;
}

const fileContent = fs.readFileSync('./data/register.csv', 'utf-8');
const registerationData:RegData[] = parse(fileContent, { 
    columns: true, 
    skip_empty_lines: true
});

for(const user of registerationData)
{
    
test(`@sanity verify user able to regiter ${user.firstName}`, async({page, baseURL}) =>
{
    const loginpage=new LoginPage(page);
    await loginpage.gotoLoginPage(baseURL);
    const registerpage:RegisterPage =await loginpage.navigatetoregister();
    const userregistered:boolean=await registerpage.registerUser(
        user.firstName,
        user.lastName,
        getRandomEmail(),
        user.tele_phone,
        user.passwd, 
        user.subscribeNewsletter
    );
    //expect(userregistered).toBeTruthy();
});

}

function getRandomEmail() : string{
const randomValue = `auto_${Math.random().toString(36).substring(2, 9)}`;
return `auto_${randomValue}@nal.com`;
}
