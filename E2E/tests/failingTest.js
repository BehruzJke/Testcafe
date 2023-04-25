import { Selector, t } from "testcafe";
import flat from "../pages/flat";
const dataSet = require('../fixtures.json')
fixture('Buy flat')
    .page('https://r.onliner.by/pk/')
    .skipJsErrors();

    test.only('Apply filters', async t => {
        await t.maximizeWindow()
        //Apply price filter
        await t.typeText(flat.minprice,dataSet.buy.min_price)
                .pressKey('tab')
                .wait(2000)
             //   await t.debug()
             let text = await flat.pricemin.innerText
             let modifiedText = text.replace(/\s/g, '')
            
        await t.expect(Number(modifiedText))
        .gt(Number(dataSet.buy.min_price))
    });
    
    
    
    


