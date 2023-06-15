import { remote } from 'webdriverio'
import { $, $$, expect } from '@wdio/globals'


const client = await remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            prefs: {
                'network.cookie.cookieBehavior': 0,
                'network.cookie.lifetimePolicy': 0,
                'network.cookie.alwaysAcceptSessionCookies': 1,
                'profile.default_content_setting_values.cookies': 1,
                'profile.cookie_controls_mode': 0,
            }
        }
    }
});

const getCustom = () => {

    const name = 'myCustomStrategy'

    const func = (selector, root) => {
        /**
         * scope should be document if called on browser object
         * and `root` if called on an element object
         */
        const scope = root ? root : document
        return scope.querySelectorAll(selector)
    }

    return [name, func]
}


// const customSelectors = [
//     {
//         name: 'hasChildWhere',
//         func: (selector, root) => {
//             /**
//             * scope should be document if called on browser object
//             * and `root` if called on an element object
//             */
//             const scope = root ? root : document
//             return scope.querySelectorAll(selector)
//         }
//     },
// ]
// browser.addLocatorStrategy(customSelectors[0].name, customSelectors[0].func)


// async function findSignInButtons() {
//     const elements = await $('#mainContent').$$('a.btn')
//     return elements.filter(anchor => {
//         const span = anchor.querySelector('span');
//         return span && span.textContent.trim() === 'Sign In';
//     });
// }


export const customBrowser = client
