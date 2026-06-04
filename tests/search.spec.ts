import {test, expect} from '../fixtures/basefixtures.js';
import { ResultsPage } from '../pages/ResultsPage.js';

const searchdata=[
    {searchkey:'macbook', count:0}, //3
    {searchkey:'samsung', count:0}, //2
    {searchkey:'iMac', count:0}, //1
    {searchkey:'dummy', count:0},
];

for(const product of searchdata) {
    
test(`search results page for ${product.searchkey}`, {tag: ['@smoke', '@sanity', '@regression']}, async({homepage}) =>
{

    const resultspage:ResultsPage = await homepage.searchItems(product.searchkey);
    expect(await resultspage.resultsCount()).toBe(product.count);   


});

}
