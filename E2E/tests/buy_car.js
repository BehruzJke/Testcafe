import {t, Selector} from 'testcafe';
const dataSet = require('../fixtures.json')
import car from '../pages/car'
fixture('Search a car')
    .page('https://ab.onliner.by/')
    .skipJsErrors();

test('Search for a car', async t =>{
    //Set max window size before test
    await t.maximizeWindow()
    //Country filter
    await t.click(car.country)
    await t.typeText(car.countryInput,dataSet.car.country)
            .pressKey('down').pressKey('enter')
    //Region filter
    await t.click(car.region)
    await t.typeText(car.regionInput,dataSet.car.region)
            .pressKey('down').pressKey('enter')
    //City filter
    await t.click(car.city)
    await t.typeText(car.cityInput,dataSet.car.city)
            .pressKey('down').pressKey('enter')
    //Brand filter
    await t.click(car.brand)
    await t.typeText(car.brandInput,dataSet.car.brand)
            .pressKey('down').pressKey('enter')
    await t.click(car.model)
    await t.typeText(car.modelInput,dataSet.car.model)
    .pressKey('down').pressKey('enter')
    await t.typeText(car.price_from,dataSet.car.price_from)
    await t.typeText(car.price_to,dataSet.car.price_to).pressKey('tab')
    //Assert the title 
    await t.expect(car.titles.innerText).contains('BMW')
    await t.click(Selector('.vehicle-form__link_primary-alter').nth(0))
    await t.wait(3000)
    //Assert that filters work correctly 

    await t.expect(car.region_assertion).ok()
        })