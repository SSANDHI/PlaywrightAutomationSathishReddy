import './hooks.js';
import { test,expect } from '@playwright/test';

test('Cleint App Playwright test',async({page})=>
{
const txt_UserName = page.locator('#userEmail')
const txt_Pwd = page.locator("#userPassword")
const btn_Login = page.locator('#login')
const cartTitles = page.locator('.card-body b')
const prodcuts = page.locator('.card-body')
const cart =  page.locator("[routerlink*='cart']")
const uName = 'sandhi.019@gmail.com'
await page.goto("https://rahulshettyacademy.com/client")
console.log(await page.title())
await expect(page).toHaveTitle("Let's Shop")
await txt_UserName.fill(uName)
await txt_Pwd.fill('JobNeed@1234')
await btn_Login.click()
//await page.waitForTimeout(5000)
await page.waitForLoadState('networkidle')
await cartTitles.last().waitFor();
const allcartTitles = await cartTitles.allTextContents()
console.log(allcartTitles)
const productName = 'ZARA COAT 3'
const pCount = await prodcuts.count()
console.log(pCount)
for(let i=0;i<pCount;i++)
{
    if(await prodcuts.nth(i).locator('b').textContent() === productName )
    {

        await prodcuts.nth(i).locator("text= Add To Cart").click()
        break;

    }
}
await page.waitForTimeout(5000)
await cart.click()
await page.locator('div li').first().waitFor()
const cartsummary = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
expect(cartsummary).toBeTruthy()


await page.locator('text=Checkout').click();
//personal Info
//await page.locator('.input.txt.text-validated').waitFor({ state: 'visible', timeout: 60000 });
await page.locator("//div[contains(text(),'Credit Card Number')]/parent::div/input").fill('5432 9087 5678 1234')
 //await page.locator('.input ddl').first().waitFor({ state: 'visible', timeout: 60000 });
 await page.locator("(//select[@class='input ddl'])[1]").first().selectOption('10')
 await page.locator("(//select[@class='input ddl'])[2]").last().selectOption('31')
 await page.locator("//div[@class='title' and contains(text(),'CVV') ]/parent::div/input").fill('276')
 await page.locator("//div[@class='title' and contains(text(),'Name') ]/parent::div/input").fill('SathishReddy')
 //await page.locator("//div[@class='title' and contains(text(),'Apply') ]/parent::div/input").fill("abc1234")
 await page.locator("//button[contains(text(),'Apply Coupon')]").click()

await page.locator("input[placeholder='Select Country']").pressSequentially("ind");
const countryDropdown = page.locator(".ta-results");
await countryDropdown.waitFor({ state: 'visible', timeout: 60000 }); // Increased timeout to 60 seconds
const countryCount = await countryDropdown.locator('button').count();
for (let i = 0; i < countryCount; i++) {
    const name = await countryDropdown.locator('button').nth(i).textContent();
    if (name === ' India') {
        await countryDropdown.locator('button').nth(i).click();
        break;
    }
}



// Updated to wait for the element to be visible before asserting its text
await expect(page.locator("//div[@class='user__name mt-5']/label")).toHaveText(uName);
//await page.locator('.action__submit').click()
await page.locator("//a[contains(text(),'Place Order ')]").click()
await page.waitForTimeout(5000)
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
const orderIdRaw = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
const orderId = (orderIdRaw ?? '').trim();
console.log(orderId)

await page.locator("//button[@routerlink='/dashboard/myorders']").click()
const yourOrdersPage = await page.locator("//*[contains(text(),'Your Orders')]").textContent()
expect(yourOrdersPage).toBe("Your Orders")
const count = await page.locator("//table[@class='table table-bordered table-hover ng-star-inserted']/child::tbody/tr").count()
console.log(count)
await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");

   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderIdRaw = await rows.nth(i).locator("th").textContent();
      const rowOrderId = (rowOrderIdRaw ?? '').trim();
      if (orderId && rowOrderId && orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   await page.waitForTimeout(5000)
   const orderIdDetailsRaw = await page.locator(".col-text").textContent();
   const orderIdDetails = (orderIdDetailsRaw ?? '').trim();
   console.log('Order details page Order Id:', orderIdDetails);
   expect(orderId && orderIdDetails && orderId.includes(orderIdDetails)).toBeTruthy();

   // Validate BILLING ADDRESS and DELIVERY ADDRESS sections and log them
   await expect(page.locator("text=BILLING ADDRESS")).toBeVisible();
   await expect(page.locator("text=DELIVERY ADDRESS")).toBeVisible();

   const summaryEmailRaw = await page.locator(`text=${uName}`).first().textContent();
   const summaryEmail = (summaryEmailRaw ?? '').trim();
   console.log('Summary page email (billing/delivery):', summaryEmail);
   expect(summaryEmail).toContain(uName);

   // Validate ordered product name and price on the summary page
   await expect(page.locator(`text=${productName}`)).toBeVisible();
   await expect(page.locator("text=$ 11500")).toBeVisible();
   console.log('Summary page product validated:', productName);
   //await page.getByRole("link").click();


   
 
});