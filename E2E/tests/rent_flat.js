import {t, Selector} from 'testcafe';
const dataSet = require('../fixtures.json')
import rentFlatPage from '../pages/rentFlatPage';


fixture('Rent flat')
    .page(`https://r.onliner.by/ak`)
    .skipJsErrors();

test('Apply filters', async t => {
    await t.maximizeWindow()

//apply rent type
await t.click(rentFlatPage.rent_type)
//apply size filter
await t.click(rentFlatPage.size)
//apply price range filter
await t.typeText(rentFlatPage.price_from, dataSet.rent.price_from)
await t.typeText(rentFlatPage.price_to, dataSet.rent.price_to)
//Metro vicinity filter
await t.click(rentFlatPage.metro_range)
       .click(Selector('li').withText(dataSet.rent.metro))
//Region filter
await t.typeText(rentFlatPage.region, dataSet.rent.region)
        .wait(2000)
        .pressKey('enter')
        .wait(2000)
// test('Sort results');
await t.click(rentFlatPage.result).wait(2000)
//assert infornation correctnes
// let price = Number(rentFlatPage.price.replace('$','').replace(/\s/g, ''))
// //Assert the price
// await t.expect(price).gte(Number(dataSet.rent.price_from))
// await t.expect(price).lte(Number(dataSet.rent.price_to))

});

