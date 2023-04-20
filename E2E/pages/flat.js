import { Selector, t } from "testcafe";
const dataSet = require('../fixtures.json')
class flat {
    constructor () {
        this.minprice = Selector('#search-filter-price-from')
        this.pricemin = Selector('.classified__price-value_complementary').nth(0).find('span').nth(0)
        this.maxprice = Selector('#search-filter-price-to')
        this.roomsfilter = Selector('.filter__item.filter__item_25').withText(dataSet.buy.rooms);
        this.roomsCount = Selector('.classified__caption-item_type-count');
        this.minarea = Selector('#search-filter-area-from')
        this.maxarea = Selector ('#search-filter-area-to');
        this.area = Selector('span').withAttribute('data-bind','text: apartment.area.total').nth(0)
        this.condition = Selector('.filter__item-inner').withText(dataSet.buy.newness)
        this.year_from = Selector('#search-filter-year-from');
        this.year_to = Selector('#search-filter-year-to')   
        this.locationInput = Selector('input').withAttribute('placeholder','Город, район, улица')
        this.firstResult = Selector('.classified__handle').nth(0);
        this.material1 = Selector('.dropdown_2')
        this.material2 = Selector('li').withText(dataSet.buy.wall_material)
        this.title = Selector('span').withText('Автобарахолка')
        }
    async min() {
        // let x = "2     1"
        let int = this.pricemin.innerText
        int = int.replace(/\s/g, '');
        return int
    }
}

export default new flat();