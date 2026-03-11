import { test,expect } from '@playwright/test';

test('Cleint App Playwright test',async({page})=>
{
const txt_UserName = page.locator('#userEmail')
const txt_Pwd = page.locator("[type='password']")
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
//await page.waitForLoadState('networkidle')
await cartTitles.last().waitFor();
const allcartTitles = await cartTitles.allTextContents()
console.log(allcartTitles)
const productName = 'ZARA COAT 3'
const pCount = await prodcuts.count()
console.log(pCount)

for(let i=0;i<pCount;i++)
{
    if(await prodcuts.nth(i).locator('b').textContent() == productName )
    {

        await prodcuts.nth(i).locator("text= Add To Cart").click()
        break;

    }
}
//await page.waitForTimeout(5000)
await cart.click()
await page.locator('div li').first().waitFor()
const cartsummary = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
expect(cartsummary).toBeTruthy()


await page.locator('text=Checkout').click();
//personal Info
await page.locator('.input txt text-validated').fill('')
await page.locator('.input txt text-validated').fill('5432 9087 5678 1234')
 await page.locator('.input ddl').first().selectOption('10')
 await page.locator('.input ddl').last().selectOption('31')
 await page.locator("//div[@class='title' and contains(text(),'CVV') ]/parent::div/input").fill(276)
 await page.locator("//div[@class='title' and contains(text(),'Name') ]/parent::div/input").fill('SathishReddy')
 //await page.locator("//div[@class='title' and contains(text(),'Apply') ]/parent::div/input").fill("abc1234")
 await page.locator("//button[contains(text(),'Apply Coupon')]").click()

await page.locator("input[placeholder='Select Country']").pressSequentially("ind");
const countryDropdown = page.locator(".ta-results")
await countryDropdown.waitFor()
const  countryCount = await countryDropdown.locator('button').count()
for(let i=0;i<countryCount;i++)
{
    const name = await countryDropdown.locator('button').nth(i).textContent()
    if(name===' India')
    {
        
       await countryDropdown.locator('button').nth(i).click()
        await page.waitForTimeout(5000)
        
        break
    }
}



expect(page.locator(".user__name[tyep='text']").first()).toHaveText(uName)
await page.locator('.action__submit').click()


})