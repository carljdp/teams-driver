import { $, $$, expect } from '@wdio/globals'

import Page from './page.js'

import { Q } from "../custom/customSelectors.js";

class LoginPage extends Page {

    // async getSignInBtn() {
    //     const a = await new Q(this.browser).from('#mainContent', 'a.btn')
    //
    //     const b = await a
    //         .whereHasDescendantsWithText('span',/sign in/i)
    //     const c = await b
    //         .whereIsDisplayed()
    //     const d = await c
    //         .one()
    //     return d
    // }

    async getSignInBtn() {
        return await new Q(this.browser)
            .from('#mainContent', 'a.btn')
            .whereHasDescendantsWithText('span', /sign in/i)
            .whereIsDisplayed()
            .one();
    }

    // get username () { return $('#username') }
    // get password () { return $('#password') }
    // get submitBtn () { return $('form button[type="submit"]') }
    // get flash () { return $('#flash') }
    // get headerLinks () { return $$('#header a') }

    async open(path) {
        await super.open('https://www.microsoft.com/en-za/microsoft-teams/log-in')
    }

    async clickSignIn() {
        await this.browser.elementClick( (await this.getSignInBtn()).elementId)
    }

}

export default new LoginPage()

