import {Page,Locator} from '@playwright/test';
import { ElementsUtil } from '../utils/ElementsUtil';
import { ProductInfoPage } from './ProductInfoPage';



export class ResultsPage
{
    private readonly page:Page;
    private readonly eleUtil:ElementsUtil;
    private readonly searchresult:Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.eleUtil=new ElementsUtil(page);
        this.searchresult=page.locator(".product-thumb");

    }

    async resultsCount():Promise<number>
    {
        return await this.searchresult.count();
    }

    async selectProduct(productname:string):Promise<ProductInfoPage>
    {
        await this.eleUtil.click(this.page.getByRole('link', {name:`${productname}`}));
        return new ProductInfoPage(this.page);
    }
}