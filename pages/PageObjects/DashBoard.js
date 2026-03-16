export class DashBoard{

    constructor(page)
{

 this.page = page;
 this.cartTitles = page.locator(".card-body b");
this.prodcuts = page.locator('.card-body');
this.cart = page.locator("[routerlink*='cart']");

}
async searchproductAddCart(productName)
{
 await this.cartTitles.last().waitFor();
   const allcartTitles = await this.cartTitles.allTextContents()
  console.log(allcartTitles)
  const pCount = await this.prodcuts.count()
   console.log(pCount)
 
 await this.page.locator(".card-body").filter({hasText: productName}).getByRole("button", { name: "Add To Cart" }).click();
 for(let i=0;i<pCount;i++)
 {
     if(await this.prodcuts.nth(i).locator('b').textContent() === productName )
     {

         await this.prodcuts.nth(i).locator("text= Add To Cart").click()
         break;

     }
 }

  await this.cart.click();

    
}

// Backwards/forwards compatibility with different method casing used in tests
async searchProductAddCart(productName) {
  return await this.searchproductAddCart(productName);
}
}
