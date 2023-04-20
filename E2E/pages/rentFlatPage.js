import { Selector, t } from "testcafe";
const dataSet = require('../fixtures.json')
class rentFlatPage {
    constructor(){
        this.rent_type = Selector('.filter__item-inner').withText(dataSet.rent.type)
        this.size = Selector('.filter__item-inner').withText(dataSet.rent.rooms)
        this.price_from = Selector('#search-filter-price-from')
        this.price_to = Selector('#search-filter-price-to')
        this.metro_range = Selector('.dropdown_2')
        this.region = Selector('input').withAttribute('placeholder','Город, улица')
        this.result = Selector('.classified').nth(0)
        this.price = Selector('.apartment-bar__price-value_complementary').innerText

    }
}

export default new rentFlatPage();