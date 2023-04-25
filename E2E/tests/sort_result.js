import { Selector, t } from "testcafe";
import flat from "../pages/flat";
const dataSet = require('../fixtures.json')
fixture('Buy flat')
    .page('https://r.onliner.by/pk/')
    .skipJsErrors();

    test('Apply price filter and sort', async t => {
        await t.maximizeWindow()
        //Apply price filter
        await t.typeText(flat.minprice,dataSet.buy.min_price)
                .pressKey('tab')
                .wait(2000)
        await t.typeText(flat.maxprice, dataSet.buy.max_price)
               .pressKey('tab')
               .wait(2000)
        //Sort cheapest results
        await t.click(flat.sortDefault)
        await t.click(flat.sortCheap)
        await t.wait(2000)
        //Assert cheapest result is more than minimum price
        let text = await flat.pricemin.innerText
        let modifiedText = text.replace(/\s/g, '')
        await t.expect(Number(modifiedText))
        .gte(Number(dataSet.buy.min_price))
        //Sort most expensive results
        await t.click(flat.sortDefault)
        await t.click(flat.sortExpensive)
        await t.wait(2000)
        //Assert that most expensive result in less than maximum price
        text = await flat.pricemin.innerText
        modifiedText = text.replace(/\s/g, '')
        await t.expect(Number(modifiedText))
        .lte(Number(dataSet.buy.max_price))
    });
    
    
    
    


