
import { $, $$, expect } from '@wdio/globals'
import {customBrowser} from "../custom/customCommands.js";

/**
* main page object containing all methods, custom and functionality
* that is shared across all page objects
*/
export default class Page {
    // nickname = 'Page'
    // title = ''

    /** @type {WebdriverIO.Browser} */
    browser

    constructor() {
        this.browser = customBrowser
    }

    /**
     * Opens the page at the specified path.
     * @returns {Promise<string>}
     */
    get title() {
        return this.browser.getTitle();
    }

    /**
     * Opens the page at the specified path.
     * @param {string} path - The path to open.
     // * @returns {Promise<void>}
     */
    async open (path) {
        await this.browser.url(path)
    }

    // /**
    // * Opens a sub-page of the page
    // * @param path path of the sub-page (e.g. /path/to/page.html)
    // */
    // openPromise (path) {
    //     return this.browser.url(`https://localhost:80/${path}`)
    // }
}