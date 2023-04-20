import {t, Selector} from 'testcafe';
const dataSet = require('../fixtures.json')
import forum from '../pages/forum'
fixture('Forum')
    .page('https://forum.onliner.by/')
    .skipJsErrors();

test('Search for topic and message', async t =>{
    await t.maximizeWindow()
    await t.typeText(forum.topic_seach, dataSet.forum.topic).wait(3000)
    //Assert the result
    await t.switchToIframe(forum.iframe)
    await t.expect(forum.result.innerText).contains(dataSet.forum.topic)
           .click(forum.firstResult)
           .wait(3000)
    await t.switchToMainWindow()
    await t.typeText(forum.message_search, dataSet.forum.message)
           .pressKey('enter')
           .wait(3000)
    await t.expect(forum.messages.innerText).contains('bmw'|'BMW')
})