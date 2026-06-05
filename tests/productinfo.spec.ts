import {test, expect} from '../fixtures/basefixtures.js';

import { ResultsPage } from '../pages/ResultsPage.js';
import { ProductInfoPage } from '../pages/ProductInfoPage.js';

const searchdata =[
    {searchkey:'macbook' , productname:'MacBook Pro', imagescount: 4, brand:'Apple', productcode: 'Product 18', rewardpoints: 800, availability: 'Out Of Stock'},
    {searchkey:'apple' , productname:'Apple Cinema 30"', imagescount: 8, brand:'Apple', productcode: 'Product 15', rewardpoints: 100, availability: 'In Stock'},
    {searchkey:'samsung' , productname:'Samsung Galaxy Tab 10.1', imagescount: 7, brand:'NA', productcode: 'SAM1', rewardpoints: 1000, availability: 'Pre-Order'},

];

for (const product of searchdata)
{
    test(`verify the product header name ${product.productname}`, {tag:['@sanity', '@regression', '@sample']}, async({homepage})=>{

        const resultpage:ResultsPage = await homepage.searchItems(product.searchkey);
        const productinfo:ProductInfoPage = await resultpage.selectProduct(product.productname);

        expect(await productinfo.getProductheader()).toBe(product.productname);


    });
}

for (const product of searchdata)
{
    test(`verify the product images for ${product.imagescount}`, async({homepage})=>
        {
        
        const resultpage:ResultsPage = await homepage.searchItems(product.searchkey);
        const productinfo:ProductInfoPage = await resultpage.selectProduct(product.productname);

        expect(await productinfo.productImageCount()).toBe(product.imagescount);


    });
}

// for (const product of searchdata)
// {
//     test(`verify the product metadata for ${product.productname}`, async({homepage})=>{

//         const resultpage:ResultsPage = await homepage.searchItems(product.searchkey);
//         const productinfo:ProductInfoPage = await resultpage.selectProduct(product.productname);

//         expect(await productinfo.getProductheader()).toBe(product.productname);
//         await productinfo.productMetaData();
//         if (product.brand && product.brand !== 'NA') {
//             expect(await productinfo.getProductMetaDataValue('Brand')).toBe(product.brand);
//         }
//         expect(await productinfo.getProductMetaDataValue('Product Code')).toBe(product.productcode);
//         expect(await productinfo.getProductMetaDataValue('Reward Points')).toBe(`${product.rewardpoints}`);
//         expect(await productinfo.getProductMetaDataValue('Availability')).toBe(product.availability);

//     });
// }
