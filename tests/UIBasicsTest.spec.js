import { test,expect } from '@playwright/test';
import { ALL } from 'node:dns';

test('Browser Context  Playwright test',async({browser})=>
{
const context = await browser.newContext({ headless: false });
const page = await context.newPage();
const txt_UserName = page.locator('#username');
const txt_Pwd =  page.locator("[type='password']");
const btn_SignIn = page.locator('#signInBtn')
const productNames = page.locator(".card-body a")
await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
console.log(await page.title());
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
//SignIn with Incorrect Cred
await txt_UserName.fill("rahulshettyacadey")
await txt_Pwd.fill("Learning@830$3mK2")
await btn_SignIn.click()
console.log(await page.locator("[style*='block']").textContent())
await expect(page.locator("[style*='block']")).toContainText('Incorrect')
//SignIn with Correct Cred
await txt_UserName.fill('')
await txt_UserName.fill("rahulshettyacademy")
await btn_SignIn.click()
await page.waitForTimeout(5000)
console.log(await productNames.first().textContent())
console.log(await productNames.last().textContent())
console.log(await productNames.allTextContents())


});
test('{handling static dropdowns',async({page})=>
{
await page.goto("https://");
console.log(await page.title());
await expect(page).toHaveTitle("Google");
});

test('{Page Playwright test',async({page})=>
{
const txt_UserName = page.locator('#username');
const txt_Pwd =  page.locator("[type='password']");
const btn_SignIn = page.locator('#signInBtn')
const dd_learnerTypeDropdown = page.locator('select.form-control')
const rdbtn_applusageTyperadioBtn = page.locator('.radiotextsty')
const chk_TermsAndCondtion = page.locator('#terms')
const lnk_document_Link = page.locator("[href*='documents-request']");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
await txt_UserName.fill("rahulshettyacademy")
await txt_Pwd.fill("Learning@830$3mK2")
await rdbtn_applusageTyperadioBtn.last().click()
console.log(await rdbtn_applusageTyperadioBtn.last().isChecked())
await expect(rdbtn_applusageTyperadioBtn.last()).toBeChecked()
await page.locator('#okayBtn').click()
await dd_learnerTypeDropdown.selectOption('Consultant')
await chk_TermsAndCondtion.click()
await expect(chk_TermsAndCondtion).toBeChecked()
await chk_TermsAndCondtion.uncheck()
await page.waitForTimeout(5000)
expect(chk_TermsAndCondtion.isChecked()).toBeTruthy();
await chk_TermsAndCondtion.click()
expect(chk_TermsAndCondtion.isChecked()).toBeTruthy();
await expect(lnk_document_Link).toHaveAttribute('class','blinkingText')
await btn_SignIn.click()
await page.waitForTimeout(5000)
});

test('Child Window Handling PlayWright',async({browser})=>
{
const context = await browser.newContext({ headless: false });
const page = await context.newPage();
const lnk_document_Link = page.locator("[href*='documents-request']");
const txt_UserName = page.locator('#username');
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

const [newPage] = await Promise.all([context.waitForEvent('page'),lnk_document_Link.click()])

const text = await newPage.locator('.red').textContent();
console.log(text)
const arrayText = text.split('@')
const domain = arrayText[1].split(' ')[0]
console.log(domain)
 //await page.pause()
 await page.waitForTimeout(5000)
await txt_UserName.fill(domain)


await page.waitForTimeout(5000)
console.log(await txt_UserName.inputValue())
await page.waitForTimeout(5000)


})

