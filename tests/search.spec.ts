import {test, expect} from '../fixtures/basefixtures';
import { ResultsPage } from '../pages/ResultsPage';

let searchdata=[
    {searchkey:'macbook', count:3},
    {searchkey:'samsung', count:2},
    {searchkey:'iMac', count:1},
    {searchkey:'dummy', count:0},
];

for(let product of searchdata) {
    
test(`search results page for ${product.searchkey}`, {tag: ['@smoke', '@sanity', '@regression']}, async({homepage}) =>
{

    let resultspage:ResultsPage = await homepage.searchItems(product.searchkey)
    expect(await resultspage.resultsCount()).toBe(product.count);   


});

}
