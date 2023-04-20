import { Selector, t } from "testcafe";
import flat from "../pages/flat";
const dataSet = require('../fixtures.json')
fixture('Buy flat')
    .page('https://r.onliner.by/pk/')
    .skipJsErrors();

    test('Apply filters', async t => {
        await t.maximizeWindow()
        //Apply price filter
        await t.typeText(flat.minprice,dataSet.buy.min_price)
                .pressKey('tab')
                .wait(2000)

        await t.expect(flat.min())
        .gt(parseInt(Number(dataSet.buy.min_price)),{ allowUnawaitedPromise: true })
    });
    
    
    
    


