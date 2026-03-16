import { expect } from '@playwright/test';
export class LoginPage{

    constructor(page)
{

 this.page = page;
 this.txt_UserName = page.locator("#userEmail");
this.txt_Pwd = page.locator("#userPassword");
this.btn_Login = page.locator('#login');

}
async goto(){
    await this.page.goto("https://rahulshettyacademy.com/client")
}
async validateLoginPage(userName, password)
{
    await this.txt_UserName.fill(userName);
    await this.txt_Pwd.fill(password);
    await this.btn_Login.click();
     console.log(await this.page.title())
     console.log("Title is: " + await this.page.title())
 await expect(this.page).toHaveTitle("Let's Shop")

}
}
