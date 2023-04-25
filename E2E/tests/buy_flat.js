import { Selector, t } from "testcafe";
import flat from "../pages/flat";
const ffmpeg = require('@ffmpeg-installer/ffmpeg');
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
        //Assert the results
        let text = await flat.pricemin.innerText
        let modifiedText = text.replace(/\s/g, '')       
        await t.expect(Number(modifiedText))
        .gt(Number(dataSet.buy.min_price))
        // apply maximum price filter
        const maxprice = Selector('#search-filter-price-to')
        await t.typeText(maxprice, dataSet.buy.max_price)
               .pressKey('tab')
               .wait(2000)
        //Assert the results
        text = await flat.pricemin.innerText
        modifiedText = text.replace(/\s/g, '')    
        await t.expect(Number(modifiedText))
        .gt(Number(dataSet.buy.min_price)) 
        //apply rooms filter
        const roomsfilter = Selector('.filter__item.filter__item_25').withText(dataSet.buy.rooms)
        await t.click(roomsfilter)
                .wait(3000)
        //apply area filter
        await t.typeText(flat.minarea, dataSet.buy.min_area)
                .pressKey('tab')
                .typeText(flat.maxarea, dataSet.buy.max_area)
                .wait(3000)
        let area = await Selector('span').withAttribute('data-bind','text: apartment.area.total').nth(0).innerText
        await t.expect(parseInt(area))
                .gte(Number(dataSet.buy.min_area))
        await t.expect(parseInt(area))
                .lte(Number(dataSet.buy.max_area))
        //Apply condition
        const condition = Selector('.filter__item-inner').withText(dataSet.buy.newness)
        await t.click(condition)
                .wait(4000)
        //Apply year filters
        await t.typeText(flat.year_from, dataSet.buy.year_from)
                .pressKey('tab')
                .typeText(flat.year_to, dataSet.buy.year_to)
                .pressKey('tab')
                .wait(2000)
    
        //Apply location filter
        await t.typeText(flat.locationInput, dataSet.buy.region)
                .wait(2000)
                .pressKey('enter')
                .wait(2000)
        
        //apply material filter
        await t.click(Selector('.dropdown_2'))
        await t.click(Selector('li').withText(dataSet.buy.wall_material)).wait(2000)
    
        //Open the result and assert details
        await t.click(Selector('.classified__handle').nth(0))
                .wait(5000)
        // assertions
        await t.expect(Selector('.apartment-options__item').nth(0).innerText).contains(dataSet.buy.newness)
        await t.expect(Selector('.apartment-options__item').nth(5).innerText).contains(dataSet.buy.wall_material)
    });
    
    
    
    


