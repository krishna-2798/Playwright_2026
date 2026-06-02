import { LoginPage } from "../pages/LoginPage";
import { test, expect } from '@playwright/test';
import { RegisterPage } from "../pages/RegisterPage";
import fs from 'fs';
import { parse } from 'csv-parse/sync';


//schema/type of reg data fields
type RegData ={
firstName: string,
lastName: string,
email: string,
tele_phone: string,
passwd: string,
subscribeNewsletter: string
}

let fileContent = fs.readFileSync('./data/register.csv', 'utf-8');
let registerationData:RegData[] = parse(fileContent, { 
    columns: true, 
    skip_empty_lines: true
});

for(let user of registerationData)
{
    
test(`verify user able to regiter ${user.firstName}`, async({page, baseURL}) =>
{
    let loginpage=new LoginPage(page);
    await loginpage.gotoLoginPage(baseURL);
    let registerpage:RegisterPage =await loginpage.navigatetoregister();
    let userregistered:boolean=await registerpage.registerUser
    (
        user.firstName,
        user.lastName,
        getRandomEmail(),
        user.tele_phone,
        user.passwd, 
        user.subscribeNewsletter
    );
    expect(userregistered).toBeTruthy()
});

}

function getRandomEmail() : string{
let randomValue = Math.random().toString(36).substring(2, 9);
return `auto_${randomValue}@nal.com`;
}
