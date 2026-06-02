
import{LoginPage} from '../pages/LoginPage';
import { test, expect } from '../fixtures/basefixtures';

test('verify valid login page @smoke',
    {
        annotation :[
            {type:'epic', description:'story'},
            {type:'feature', description:'Login Functionality'},
            {type:'severity', description:'critical'},
            {type:'owner', description:'krishna'},
        ]
    },
    async ({homepage})=>{
    await expect(homepage.page).toHaveTitle('My Account');

}
);

test('verify invalid login page', async ({page, baseURL})=>{
    let lp = new LoginPage(page);
    await lp.gotoLoginPage(baseURL);
    await lp.doLogin("abc@gmail.com", "123456789");
    const msg = await lp.geterrormsg();
    expect(msg).toContain(" Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.");
});