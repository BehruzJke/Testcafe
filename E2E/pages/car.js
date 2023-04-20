import { Selector, t } from "testcafe";
const dataSet = require('../fixtures.json')
class car {
    constructor(){
        this.country = Selector('.vehicle-form__input').withText('Все страны')
        this.countryInput = Selector('input').withAttribute('placeholder','Найти страну')
        this.region = Selector('.vehicle-form__input').withText('Все области')
        this.regionInput = Selector('input').withAttribute('placeholder','Найти область')
        this.city = Selector('.vehicle-form__input').withText('Все города')
        this.cityInput = Selector('input').withAttribute('placeholder','Найти город')
        this.brand =  Selector('.vehicle-form__input').withText('Марка')
        this.brandInput = Selector('input').withAttribute('placeholder','Найти марку')
        this.model = Selector('.vehicle-form__input').withText('Модель')
        this.modelInput = Selector('input').withAttribute('placeholder','Найти модель')
        this.price_from = Selector('input').withAttribute('placeholder','от')
        this.price_to = Selector('input').withAttribute('placeholder','до')
        this.titles = Selector('.vehicle-form__link_primary-alter')
        this.region_assertion = Selector('.vehicle-form__intro-item').withText('Минск');


    }
}

export default new car();