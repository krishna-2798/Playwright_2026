import {Page, Locator} from '@playwright/test';
import { ElementsUtil } from '../utils/ElementsUtil';



export class ProductInfoPage
{
    private readonly page:Page;
    private readonly eleUtil:ElementsUtil;
    private readonly header:Locator;
    private readonly imgcount:Locator;
    private readonly metadata:Locator;
    private readonly pricing:Locator;

    private readonly productmap=new Map<string, string |null>(); 

    constructor(page:Page)
    {
        this.page=page;
        this.eleUtil=new ElementsUtil(page);
        this.header=page.locator("h1");
        this.imgcount = page.locator("div#content img");
        this.metadata=page.locator("(//div[@id='content']//ul[@class='list-unstyled'])[1]//li");
        this.pricing=page.locator("(//div[@id='content']//ul[@class='list-unstyled'])[2]//li");
    }

    async getProductheader():Promise<string>
    {
        const header=await this.eleUtil.getInnerTexts(this.header)
        return header.trim();
    }

    async productImageCount()
    {
        await this.eleUtil.waitForElementVisible(this.imgcount);
        const imgcount = await this.imgcount.count();
        return imgcount;
    }

    async productMetaData()
    {
        let metadata:string[]=await this.eleUtil.getAllInnerTexts(this.metadata);
        for(let meta of metadata)
        {
            let metadata:string[]=meta.split(':');
            if (metadata.length < 2) {
                continue;
            }
            let key=metadata[0].trim().toLowerCase();
            let value = metadata[1].trim();
            this.productmap.set(key,value);
        }
    }

    async getProductMetaDataValue(key:string):Promise<string|null|undefined>
    {
        if (this.productmap.size === 0) {
            await this.productMetaData();
        }
        return this.productmap.get(key.toLowerCase());
    }
    
    async productPricing()
    {
        let pricing:string[]=await this.eleUtil.getAllInnerTexts(this.pricing);

            let productprice=pricing[0].trim();
            let extaxprice = pricing[1].split(':')[1].trim();
            this.productmap.set('price', productprice);
            this.productmap.set('productextax', extaxprice);
        
    
    }

}

