import { Selector, t } from "testcafe";
const dataSet = require('../fixtures.json')
class forum {
    constructor(){
        this.topic_seach = Selector('.fast-search__input')
        this.message_search = Selector('#search_keywords')
        this.messages = Selector('.content')
        this.iframe = Selector('.modal-iframe')
        this.result = Selector('.result__item_forum').nth(0)
        this.firstResult = Selector('.result__item_forum').nth(0)
    }
}

export default new forum();